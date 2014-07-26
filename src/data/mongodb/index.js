(function (database) {

  var mongodb = require("mongodb");
  var credentials = require("../../config/credentials.js").credentials;
  var databaseInstance = null;

  database.getDatabase = function (next) {
    if (!databaseInstance) {
      // connect to the database
      mongodb.MongoClient.connect(credentials.mongodb.connectionString, function (err, db) {
        if (err) {
          next(err, null);
        } else {
          databaseInstance = {
            db: db,
            users: db.collection("users"),
            talks: db.collection("talks"),
          };
          next(null, databaseInstance);
        }
      });
    } else {
      next(null, databaseInstance);
    }
  };

})(module.exports);