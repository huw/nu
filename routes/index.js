
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log("\033[90mIP: \033[32m"+req.ip+"\033[31m"); // Log connecting IP address

	var request  = require('request'); // Import modules
    var async    = require('async');
    var fs       = require('fs');

    // This line disables checking for SSL certs on https
    // It should not be used in production, and only on broken networks
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    // Define variables
	var birthday    = +new Date("1999-04-28");
	var age         = ~~((Date.now() - birthday) / (31557600000)) + 1; // Divides time alive by years and adds 1
	var redditKarma, gitCommits = 0;
    var apiKey;

    var gitHubOptions = { // Send some stuff to GitHub servers
        'url'    : 'https://api.github.com/users/huw/repos',
        'headers': {
            'User-Agent': 'huw'
        }
    };

    fs.readFile('settings.json', function (err, data) { // Pull API Key from settings.json
        if (err) throw err;
        data   = JSON.parse(data);
        apiKey = data.apiKey;
        
        if (apiKey == null) {
            console.log("apiKey is not defined! Remember to make a settings.json file!");
        }
    });

    function render() { // This function renders the page with the data we have
        res.render('index', {
            "age"        : age,
            "redditKarma": redditKarma,
            "gitCommits" : gitCommits,
            "apiKey"     : apiKey
        })
    }

    function reddit(error, response, body) { // This one pulls our reddit data and moves onto GitHub
        if (error) throw error;
        if (response.statusCode == 200) {
            redditKarma = JSON.parse(body);
            redditKarma = parseInt(redditKarma.data.link_karma) + parseInt(redditKarma.data.comment_karma);

            request(gitHubOptions, github);
        } else {
            redditKarma = "~10000";

            request(gitHubOptions, github);
        }
    }

    function github(error, response, body) { // This one pulls our GitHub data and renders it
        if (error) throw error;
        if (response.statusCode == 200) {
            var gitRepos = JSON.parse(body);

            async.eachSeries (gitRepos, function (item, callback) { // This makes sure the for loop finishes before rendering

                var gitHubOptions = {
                    'url'    : item.url + "/stats/contributors",
                    'headers': {
                        'User-Agent': 'huw'
                    }
                };

                request(gitHubOptions, function (error, response, body) {
                    if (error) throw error;
                    if (response.statusCode == 200) {
                        gitCommits += JSON.parse(body)[0].total;
                        callback(null);
                    }
                });
            }, function (err) {
                render();
            });
        } else {
            console.log("Error " + response.statusCode + ": " + response.body); 
            gitCommits = "~42"
            render();
        }
    }

    request('https://www.reddit.com/user/3vans/about.json', reddit); // This just kicks everything off
};