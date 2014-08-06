(function(scheduler){
	var schedule = require('node-schedule');
	var logger = require("../utils/logger");
    var requires = require("../utils/requireAll");
    var jobs = requires.requireAll(__dirname + '/');
    var _ = require("underscore");

	scheduler.init = function(){
		logger.info("Initializing Scheduler");

		var filteredJobs = _.filter(jobs, function(job){ 
            return job.enable === true; 
        });


        filteredJobs.forEach(function(job) {
            job.init(schedule);
        });
	};

})(module.exports);