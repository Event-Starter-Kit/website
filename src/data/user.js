(function(data) {

    var database = require("./mongodb");

    data.getUser = function(username, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.users.findOne({
                    username: username
                }, next);
            }
        });
    };

    data.getUserByEmail = function(email, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.users.findOne({
                    email: email
                }, next);
            }
        });
    };

    data.getUserByTwitterUsername = function(twitterUsername, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.users.findOne({ "twitter.username" : twitterUsername}, next);
            }
        });
    };

    data.insertUser = function(user, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.users.insert(user, next);
            }
        });
    };

})(module.exports);
