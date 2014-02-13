
/*
 * GET home page.
 */

exports.index = function(req, res){
	var birthday = +new Date("1999-04-28");
	var age      = ~~((Date.now() - birthday) / (31557600000)) + 1;

    res.render('index', {"age": age});
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