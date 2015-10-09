import * as mongodb from 'mongodb';

export class dbFacility {
    db: mongodb.Db;
    talk: mongodb.Collection;
    votes: mongodb.Collection;
    speakers: mongodb.Collection;

    constructor(db: mongodb.Db) {
        this.db = db;
        this.talk = db.collection("tracks");
        this.speakers = db.collection("speakers")
    }
}

