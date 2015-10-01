/*
 * @Author: imperugo
 * @Date:   2015-06-23 21:50:13
 * @Last Modified by:   imperugo
 * @Last Modified time: 2015-06-23 23:58:39
 */


(function(scheduleController) {

    'use strict';
    var logger = require('../utils/logger');
    var data = require("../data/schedule");
    var _ = require('underscore');

    scheduleController.init = function(app) {

        app.get("/schedule/getTrackSessions", function(req, res) {
            data.getTrackSessions(function(err, tracks) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.json(_.groupBy(tracks,function(o) {
                        return o.track;
                    }));
                }
            });
        });
    };


})(module.exports);
