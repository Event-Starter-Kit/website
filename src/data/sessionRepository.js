/* 
	- Session A
        - Conference (All needed info from conference.js)
        - Proposal (All needed info from proprosals)
        - Room name
        - Track
        - Start Date
        - End Date
        - Ratings (average and number of votes)
*/

(function(data) {
	var database = require("./mongodb");

	data.getSessionsByDate = function(pageIndex, pageSize, startDate, endDate, conferenceId, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                var sessions = db.sessions
                	.find()
                	.sort({Lastname: -1})
                	.skip(pageIndex)
                	.limit(pageSize);

               	next(null, sessions);
            }
        });
    };

    data.getSessionsBySpeaker = function(pageIndex, pageSize, speakerUsername, conferenceId, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                var sessions = db.sessions
                	.find()
                	.sort({Lastname: -1})
                	.skip(pageIndex)
                	.limit(pageSize);

               	next(null, sessions);
            }
        });
    };

})(module.exports);