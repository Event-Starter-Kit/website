/* 
 * @Author: imperugo
 * @Date:   2015-06-23 22:37:52
 * @Last Modified by:   imperugo
 * @Last Modified time: 2015-07-07 13:41:07
 */

(function(data) {

    'use strict';
    var database = require("./database");
    var ObjectID = require('mongodb').ObjectID;
    var logger = require('../utils/logger');
    var _ = require("underscore");

    data.updateVotes = function(next) {
        database.getDatabase(function(err, db) {
            db.tracks.find().forEach(function(session) {
                db.votes.update({
                    sessionId: new ObjectID(session._id)
                }, {
                    $set: {
                        sessionTitle: session.title,
                        sessionAuthorName: session.author.firstname,
                        sessionAuthorLastName: session.author.lastname,
                        sessionAuthorTwitter: session.author.twitter
                    }
                }, {
                    multi: true
                });

                logger.info("Updated: " + session.title);
            });

            next(null);
        });

    };

    data.voteSession = function(vote, sessionId, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err, null);
            } else {

                db.tracks.findOne({
                        _id: new ObjectID(sessionId)
                    },
                    function(err, session) {
                        logger.debug(session);

                        var voteObject = {
                            createAt: new Date(),
                            sessionId: new ObjectID(sessionId),
                            sessionTitle: session.title,
                            sessionAuthorName: session.author.firstname,
                            sessionAuthorLastName: session.author.lastname,
                            sessionAuthorTwitter: session.author.twitter,
                            vote: vote
                        };

                        db.votes
                            .insert(voteObject, function(err) {
                                if (err) {
                                    next(err);
                                } else {
                                    db.votes.aggregate({
                                        $match: {
                                            "sessionId": new ObjectID(sessionId)
                                        }
                                    }, {
                                        $group: {
                                            _id: "$sessionId",
                                            avgQuantity: {
                                                $avg: "$vote"
                                            }
                                        }
                                    }, function(err, results) {
                                        if (err) {
                                            next(err, null);
                                        } else {
                                            next(null, results);
                                        }
                                    });
                                }
                            });
                    });


            }
        });
    };

    data.getVote = function(sessionId, next) {

        database.getDatabase(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                db.votes.aggregate({
                    $match: {
                        "sessionId": new ObjectID(sessionId)
                    }
                }, {
                    $group: {
                        _id: "$sessionId",
                        avgQuantity: {
                            $avg: "$vote"
                        }
                    }
                }, function(err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

    data.getVotes = function(next) {

        database.getDatabase(function(err, db) {
            if (err) {
                next(err, null);
            } else {
                db.votes.aggregate({
                    $group: {
                        _id: "$sessionId",
                        avgQuantity: {
                            $avg: "$vote"
                        }
                    }
                }, function(err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        });
    };

})(module.exports);
