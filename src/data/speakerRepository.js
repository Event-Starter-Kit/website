(function(data) {
	var database = require("./mongodb");

	data.getSpeakers = function(pageIndex, pageSize, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                var speakers = db.speakers
                	.find()
                	.sort({Lastname: -1})
                	.skip(pageIndex)
                	.limit(pageSize);

               	next(null, speakers);
            }
        });
    };

})(module.exports);
