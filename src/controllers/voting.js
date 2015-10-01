/*
 * @Author: imperugo
 * @Date:   2015-06-23 21:50:13
 * @Last Modified by:   imperugo
 * @Last Modified time: 2015-07-07 10:09:02
 */


(function(votingController) {

    'use strict';
    var logger = require('../utils/logger');
    var dataVoting = require("../data/voting");
    var dataTracks = require("../data/schedule");
    var _ = require('underscore');

    votingController.init = function(app) {

        app.get("/voting/votesUpdated", function(req,res){
            dataVoting.updateVotes(function(err){
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(200).send("Update done!");
                }
            });
            
            //res.status(200).send("Update done!");
        });

        app.get("/voting/proposal", function(req,res){

            dataTracks.getTrackSessions(function(err, tracks) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.render("voting/proposal", {
                        applicationName: "Web European Conference",
                        title: "Web European Conference",
                        csrfToken: req.csrfToken(),
                        // embed the livereload script
                        livereload: GLOBAL.env === 'dev',
                        tracks: tracks
                    });
                }
            });
        });

        app.post("/voting/vote/", function(req, res) {

            req.assert('sessionId', 'Field required').notEmpty();
            req.assert('vote', 'Field required').notEmpty();
            req.assert('vote', 'Invalid vote').isInt();

            var sessionId = req.body.sessionId;
            var vote = parseInt(req.body.vote);

            var errors = req.validationErrors();

            if (errors) {
                logger.warn("Wrong request: ", errors);
                return res.json(400, errors);
            }

            dataVoting.voteSession(vote, sessionId, function(err, newAverageVote) {
                if (err) {
                    res.status(400).send("Failed to add vote to data store");
                } else {
                    res.set("Content-Type", "application/json");
                    res.status(201).send(newAverageVote[0]);
                }
            });
        });

        app.get("/voting/votes/", function(req, res) {
            dataVoting.getVotes(function(err, results) {
                if (err) {
                    res.status(400).send("Failed to retrieve votes from data store");
                } else {
                    res.set("Content-Type", "application/json");
                    res.status(200).send(results);
                }
            });
        });
    };


})(module.exports);
