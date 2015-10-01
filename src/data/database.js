/*
 * @Author: imperugo
 * @Date:   2015-06-23 21:50:13
 * @Last Modified by:   imperugo
 * @Last Modified time: 2015-08-12 19:36:44
 */


(function(databaseModule) {

    'use strict';
    var logger = require('../utils/logger');
    var configuration = require("../config/credentials");
    var Q = require("Q");

    var mongodb = require("mongodb");
    var database = null;

    databaseModule.getDatabase = function() {
        var deferred = Q.defer();

        if (!database) {
            // connect to the database
            mongodb.MongoClient.connect(configuration.credentials.mongo.connectionString, function(err, db) {
                if (err) {
                    deferred.reject(new Error(err));
                } else {
                    database = {
                        db: db,
                        tracks: db.collection("tracks"),
                        votes: db.collection("votes"),
                        speakers: db.collection("speakers")
                    };
                    deferred.resolve(database);
                }
            });
        } else {
           deferred.resolve(database);
        }

        return deferred.promise;
    };

})(module.exports);
