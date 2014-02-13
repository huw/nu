
/*
 * GET home page.
 */

exports.index = function(req, res){
    var request = require('request');
    var fs = require('fs');

    var bodyArray;
    var imageURL;
    var coverURL;

    var download = function (uri, filename) {
        request.head(uri, function(err, res, body) {
            request(uri).pipe(fs.createWriteStream(filename));
        });
    };

	request('https://www.googleapis.com/plus/v1/people/116435831516205433308?key=AIzaSyCkKwR51ZTzPbUzCWkidPl0a50MXhzGwwM', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			bodyArray = JSON.parse(body);
            imageURL = bodyArray.image.url.replace("50", "300");
            coverURL = bodyArray.cover.coverPhoto.url;

            fs.readFile('settings.txt', 'utf8', function (err, data) {
                if (err) throw err;
                var data = JSON.parse(data);
                if (imageURL != data.imageURL) {
                    download(imageURL, 'public/images/profile.png');
                    data.imageURL = imageURL;
                    fs.writeFile('settings.txt', JSON.stringify(data), function (err) {
                        if (err) throw err;
                    });
                    res.render('index', {});
                } else {
                    res.render('index', {});
                }
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