import * as express from 'express';
import { controllerBase } from './controllerBase';
import { scheduleData } from '../data/scheduleData';
import { homeViewModel } from './viewModel/homeViewModel';

export class homeController extends controllerBase {
    private scheduleData: scheduleData;

    constructor(app: express.Express) {
        super(app);

        this.scheduleData = new scheduleData();
        this.home();
    }

    private home() {
        this.app.get("/", (req, res) => {
            let model = new homeViewModel(req);

            this.scheduleData.getTalks()
                .then(output => {
                    model.talks = output;
                    
                     res.render("home/index", model);
                });
        });
    }
}

/*

(function(homeController) {
    var logger = require("../utils/logger.js");
    var Q = require("Q");

    homeController.init = function(app) {

        app.get("/", function(req, res) {

            var model = {
                applicationName: "Web European Conference",
                title: "Web European Conference",
                csrfToken: req.csrfToken(),
                // embed the livereload script
                livereload: GLOBAL.env === 'dev',
            };


            homeController.populateModelWithSessions(model)
            .then(homeController.populateModelWithSpeakers(model))
                .catch(function(err) {
                    logger.error("error " + err);
                    
                    res.status(400)
                        .send(err);
                })
                .done(function(){
                    logger.debug("rendering view .....");

                    res.render("home/index", model);
                });
        });

        app.get("/register-Web%20European%20Conference", function(req,res){
            res.redirect(301, '/');
        });

    };

    homeController.populateModelWithSpeakers = function(model) {
        var deferred = Q.defer();
        var speakers = require("../data/speakers");

        speakers.getSpeakers()
            .then(function(data) {
                logger.debug("assigning speakers to model....");
                model.speakers = data;
            })
            .catch(function(err) {
                deferred.reject(new Error(err));
            })
            .done(function(){
                deferred.resolve(model);
            });

        return deferred.promise;
    };

    homeController.populateModelWithSessions = function(model) {
        
        var schedule = require("../data/schedule");
        var _ = require('underscore');
        var deferred = Q.defer();

        schedule.getTrackSessions()
            .then(function(data) {
                logger.debug("assigning tracks to model....");
                model.tracks = _.groupBy(data, function(o) {
                    return o.track;
                });
            })
            .catch(function(err) {
                deferred.reject(new Error(err));
            })
            .done(function(){
                deferred.resolve(model);
            });

        return deferred.promise;
    };


})(module.exports);
*/