import { dbFacility } from './dbFacility';
import { loggerBaseClass } from '../../loggerBaseClass';
import * as credentials from '../../config/credentials';
import * as mongodb from 'mongodb';

export class dbContext extends loggerBaseClass {
    private static facility: dbFacility;

    GetDbContext(): Promise<dbFacility> {
        var p = new Promise<dbFacility>((resolve, reject) => {
            if (!dbContext) {
                mongodb.MongoClient.connect(credentials.mongo.connectionString, (err, db) => {
                    if (err) {
                        this.logger.error(err.message, err);
                        reject(err);
                    }
                    dbContext.facility = new dbFacility(db);
                    resolve(dbContext.facility);
                });
            } else {
                resolve(dbContext.facility);
            }
        });
       
        return p;
    }
}

