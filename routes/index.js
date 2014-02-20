
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log("\033[90mIP: \033[32m"+req.ip+"\033[31m");

	var request  = require('request');
    var async    = require('async');
    var fs       = require('fs');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

	var birthday    = +new Date("1999-04-28");
	var age         = ~~((Date.now() - birthday) / (31557600000)) + 1; // Divides time alive by years and adds 1
	var redditKarma, gitCommits, apiKey = 0;

    var gitHubOptions = {
        'url'    : 'https://api.github.com/users/huw/repos',
        'headers': {
            'User-Agent': 'huw'
        }
    };

    fs.readFile('settings.json', function (err, data) {
        if (err) throw err;
        apiKey = JSON.parse(data).apiKey;
    });

    if (apiKey == 0) {
        console.log("apiKey is not defined! Remember to make a settings.json file!");
    }

    function reddit(error, response, body) {
        if (error) throw error;
        if (response.statusCode == 200) {
            redditKarma = JSON.parse(body);
            redditKarma = parseInt(redditKarma.data.link_karma) + parseInt(redditKarma.data.comment_karma);

            request(gitHubOptions, github);
        } else {
            redditKarma = "~9000";

            request(gitHubOptions, github);
        }
    }

    function github(error, response, body) {
        if (error) throw error;
        if (response.statusCode == 200) {
            var gitRepos = JSON.parse(body);

            async.eachSeries (gitRepos, function (item, callback) {
                console.log("For loop iterates");

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
			console.log(gitCommits);
                        callback(null);
                    }
                });
            }, function (err) {
                console.log("finishing loop");
                res.render('index', {
                    "age"        : age,
                    "redditKarma": redditKarma,
                    "gitCommits" : gitCommits,
                    "apiKey"     : apiKey
                })
            });
        } else {
            console.log("Error " + response.statusCode + ": " + response.body);
            res.render('index', {
                "age"        : age,
                "redditKarma": redditKarma,
                "gitCommits" : "~31",
                "apiKey"     : apiKey
            });
        }
    }

    function perform() {
        request('https://www.reddit.com/user/3vans/about.json', reddit);
    }

    perform();
};

/*exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('users');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.adduser = function(db) {
    return function(req, res) {
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        var collection = db.get('users');

        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.location("userlist");
                res.redirect("userlist");
            }
        });
    }
}*/
