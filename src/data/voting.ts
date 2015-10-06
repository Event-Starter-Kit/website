import * as loggerFactory from '../utils/logger';
import * as mongodb from 'mongodb';
import * as database from './database';
import * as _ from 'underscore';

var ObjectID = mongodb.ObjectID;
var logger = loggerFactory.factory.logger();

export class speakerData {
    db: database.dbFacility

    constructor() {
        this.db = new database.database().getDatabase();
    }

    getVote(sessionId: string) {
        this.db.votes.aggregate([
            {
                $match: {
                    "sessionId": new ObjectID(sessionId)
                }
            },
            {
                $group: {
                    _id: "$sessionId",
                    avgQuantity: {
                        $avg: "$vote"
                    }
                }
            }], (err, results) => {
                if (err) {
                    logger.error(err.message, err);
                    throw new Error(err.message);
                } else {
                    return results;
                }
            });
    }

    getVotes() {
        this.db.votes.aggregate([
            {
                $group: {
                    _id: "$sessionId",
                    avgQuantity: {
                        $avg: "$vote"
                    }
                }
            }], (err, results) => {
                if (err) {
                    logger.error(err.message, err);
                    throw new Error(err.message);
                } else {
                    return results;
                }
            });
    }
}
/*
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
*/