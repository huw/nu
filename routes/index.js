
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

    res.render('index', {});
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