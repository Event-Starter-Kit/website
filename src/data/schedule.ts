import * as loggerFactory from '../utils/logger';
import * as mongodb from 'mongodb';
import * as database from 'database';

var logger = loggerFactory.factory.logger();

export class scheduleData {
    db: database.dbFacility

    constructor() {
        this.db = new database.database().getDatabase();
    }

    getTrackSessions() {
        this.db.tracks
            .find()
            .sort({
                "time": 1
            })
            .toArray(function(err, results) {
                if (err) {
                    logger.error(err.message, err);

                    throw new Error(err.message);
                } else {
                    return results;
                }
            });
    }
}