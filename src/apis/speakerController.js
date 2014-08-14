(function(controller) {

    var speakerRepository = require('../data/speakerRepository');
    var logger = require("../utils/logger");

    controller.init = function(app) {

        /**
         * @api {get} /api/speakers/ Get speakers information
         * @apiName GetSpeakers
         * @apiGroup Speakers
         * @apiVersion 1.0.0
         *
         * @apiParam {Number} page     the number of the page to load
         * @apiParam {Number} limit    number of apllication items to load per page
         * 
         * @apiErrorTitle (400) 400 Bad Request
         * @apiError (400) page Page is not a valid number or the value is not between a and 1000.
         * @apiError (400) limit Limit is not a valid number or the value is not between a and 1000.
         * @apiError (400) limit PageSize is not a valid number or the value is not between a and 1000.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 400 Bad Request
         *     {
         *       [{
         *           "param": "page",
         *           "msg": "Page is not a valid number"
         *       }, {
         *           "param": "limit",
         *           "msg": "Limit is not a valid number"
         *       }, {
         *           "param": "page",
         *           "msg": "Page value must be greater than 1 and lesser than 1000."
         *       }, {
         *           "param": "limit",
         *           "msg": "Limit value must be greater than 1 and lesser than 1000."
         *       }]
         *     }
         */
        app.get("/api/speakers/", function(req, res) {
        	
        	req.checkQuery('page', 'PageIndex is not a valid number').isInt();
			req.checkQuery('limit', 'PageSize is not a valid number').isInt();
            req.checkQuery('page', 'PageIndex value must be greater than 1 and lesser than 1000.').len(1, 1000);
            req.checkQuery('limit', 'PageSize value must be greater than 1 and lesser than 1000.').len(1, 1000);

            var errors = req.validationErrors();
            var mappedErrors = req.validationErrors(true);

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);

                return;
            }

            var page = parseInt(req.query.page);
            var limit = parseInt(req.query.limit);

            speakerRepository.getSpeakers(page, limit, function(err, results) {
                res.json(results);
            });
        });
    };

})(module.exports);
