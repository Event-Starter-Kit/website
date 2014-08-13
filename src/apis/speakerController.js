(function(controller) {

    var speakerRepository = require('../data/speakerRepository');
    var logger = require("../utils/logger");

    controller.init = function(app) {
        app.get("/api/speakers/", function(req, res) {
        	
        	req.checkQuery('pageIndex', 'PageIndex is not a valid number').isInt();
			req.checkQuery('pageSize', 'PageSize is not a valid number').isInt();
            req.checkQuery('pageIndex', 'PageIndex value must be greater than 1 and lesser than 1000.').len(1, 1000);
            req.checkQuery('pageSize', 'PageSize value must be greater than 1 and lesser than 1000.').len(1, 1000);
            

            var errors = req.validationErrors();
            var mappedErrors = req.validationErrors(true);

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);

                return;
            }

            var pageIndex = parseInt(req.query.pageIndex);
            var pageSize = parseInt(req.query.pageSize);

            speakerRepository.getSpeakers(pageIndex, pageSize, function(err, results) {
                res.json(results);
            });
        });
    };

})(module.exports);
