
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log("\033[90mIP: \033[32m"+req.ip+"\033[31m");

	var request  = require('request');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

	var birthday    = +new Date("1999-04-28");
	var age         = ~~((Date.now() - birthday) / (31557600000)) + 1; // Divides time alive by years and adds 1
	var redditKarma, gitCommits = 0;

    var gitHubOptions = {
        'url'    : 'https://api.github.com/users/huw/repos',
        'headers': {
            'User-Agent': 'huw'
        }
    };

    request(gitHubOptions, function (error, response, body) {
        if (error) throw error;
        if (response.statusCode == 200) {
            console.log('200 recieved');
            var gitRepos = JSON.parse(body);

            for (i = 0; i < gitRepos.length; i++) {
                var gitHubOptions = {
                    'url'    : gitRepos[i].url + "/stats/contributors",
                    'headers': {
                        'User-Agent': 'huw'
                    }
                };

                request(gitHubOptions, function (error, response, body) {
                    if (error) throw error;
                    if (response.statusCode == 200) {
                        gitCommits += JSON.parse(body)[0].total
                    }
                });
            }
        } else {
            console.log("Error " + response.statusCode + ": " + response.body);
        }
    });

	request('https://www.reddit.com/user/3vans/about.json', function (error, response, body) {
		if (error) throw error;
        if (response.statusCode == 200) {
			redditKarma = JSON.parse(body);
			redditKarma = parseInt(redditKarma.data.link_karma) + parseInt(redditKarma.data.comment_karma);

            res.render('index', {
                "age"        : age,
                "redditKarma": redditKarma
            });
		} else {
			res.render('index', {
				"age"        : age,
				"redditKarma": "~9000"
			});
		}
	});
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
