module.exports = function(req, res, next) {

    if (req) {
        var app = req.app;
        if (typeof(app) == 'undefined') {
            var err = new Error("The module requires express");
            next(err);
            return;
        }

        var conference = require("../config/conference");
        res.conference = conference;
    }

    next();
};
