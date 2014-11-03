(function(data) {
	var database = require("./mongodb");

	data.getSponsors = function(pageIndex, pageSize, next) {
        database.getDatabase(function(err, db) {
            if (err) {
                next(err);
            } else {
                var sponsors = db.sponsors
                	.find()
                	.sort({Lastname: -1})
                	.skip(pageIndex)
                	.limit(pageSize);

               	next(null, sponsors);
            }
        });
    };

})(module.exports);
