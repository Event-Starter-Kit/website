/* 
 * @Author: imperugo
 * @Date:   2015-06-23 22:37:52
 * @Last Modified by:   imperugo
 * @Last Modified time: 2015-08-13 00:12:14
 */

(function(data) {

    'use strict';
    var database = require("./database");
    var logger = require("../utils/logger.js");
    var Q = require("Q");

    data.getSpeakers = function() {
        var deferred = Q.defer();

        database.getDatabase()
            .then(function(db) {
                logger.debug("reading speakers .....");

                db.speakers
                    .find()
                    .sort({"order":1})
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
