import * as loggerFactory from '../utils/logger';
import * as credentials from '../config/credentials';
import * as mongodb from 'mongodb';

var logger = loggerFactory.factory.logger();

export class database {
    private static facility: dbFacility;

    getDatabase(): dbFacility {
        if (!database) {
            mongodb.MongoClient.connect(credentials.mongo.connectionString, (err, db) => {
                if (err) {
                    logger.error(err.message, err);
                    throw new Error(err.message);
                }
                database.facility = new dbFacility(db);
            });
        } else {
            return database.facility;
        }
    }
}

export class dbFacility {
    db: mongodb.Db;
    tracks: mongodb.Collection;
    votes: mongodb.Collection;
    speakers: mongodb.Collection;

    constructor(db: mongodb.Db) {
        this.db = db;
        this.tracks = db.collection("tracks");
        this.votes = db.collection("votes");
        this.speakers = db.collection("speakers")
    }
}

