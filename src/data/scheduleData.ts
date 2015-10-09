import { loggerBaseClass } from '../loggerBaseClass';
import { dbBaseClass } from './dbHelpers/dbBaseClass';
import { dbContext } from './dbHelpers/dbContext';
import { dbFacility } from './dbHelpers/dbFacility';
import { talk } from './model/talk';

import * as mongodb from 'mongodb';

export class scheduleData extends dbBaseClass {
    constructor() {
        super();
    }

    getTalks(): Promise<talk[]> {

        var p = new Promise<talk[]>((resolve, reject) => {

            this.getDatabase()
                .then(db => {
                    db.talk
                        .find()
                        .sort({ "time": 1 })
                        .toArray((err: Error, results:any) => {
                            if (err) {
                                this.logger.error(err.message, err);
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        });
                })
                 .catch((reason) => {
                    reject(reason);
                });
        });

        return p;
    }
}