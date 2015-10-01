/* 
 * @Author: imperugo
 * @Date:   2015-06-23 22:37:52
 * @Last Modified by:   imperugo
 * @Last Modified time: 2015-08-12 23:26:36
 */

(function(data) {

    'use strict';
    var database = require("./database");
    var logger = require("../utils/logger.js");
    var Q = require("Q");


    data.getTrackSessions = function() {
        var deferred = Q.defer();

        database.getDatabase()
            .then(function(db) {
                logger.debug("reading tracks .....");
                db.tracks
                    .find()
                    .sort({
                        "time": 1
                    })
                    .toArray(function(err, results) {
                        if (err) {
                            deferred.reject(new Error(err));
                        } else {
                            deferred.resolve(results);
                        }
                    });
            })
            .catch(function(err){
                deferred.reject(new Error(err));
            });

        return deferred.promise;
    };

})(module.exports);
