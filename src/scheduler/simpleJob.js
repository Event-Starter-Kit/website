(function(job){
	var logger = require("../utils/logger");

	job.enable = true;

	job.init = function(scheduler){
		logger.debug('Initializing simple job.');

		//more info here https://github.com/mattpat/node-schedule
		var rule = new scheduler.RecurrenceRule();
		rule.second = 20;

		var j = scheduler.scheduleJob(rule, function(){
		    logger.debug('Taaaaaaaaac.');
		});
	};

})(module.exports);