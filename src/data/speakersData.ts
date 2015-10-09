import { dbBaseClass } from './dbHelpers/dbBaseClass';
import { dbContext } from './dbHelpers/dbContext';
import { dbFacility } from './dbHelpers/dbFacility';
import { speaker } from './model/speaker';

import * as mongodb from 'mongodb';

export class speakerData extends dbBaseClass {
    private db: dbFacility

    constructor() {
        super();
    }

    getTalks(): Promise<speaker[]> {

        var p = new Promise<speaker[]>((resolve, reject) => {

            this.getDatabase()
                .catch((reason) => {
                    reject(reason);
                })
                .then(db => {
                    db.speakers
                        .find()
                        .sort({ "order": 1 })
                        .toArray((err: Error, results: any) => {
                            if (err) {
                                this.logger.error(err.message, err);
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                });
        });

        return p;
    }
}