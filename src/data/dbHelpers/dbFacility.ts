import * as mongodb from "mongodb";

export class DbFacility {
    public Db: mongodb.Db;
    public Talk: mongodb.Collection;
    public Votes: mongodb.Collection;
    public Speakers: mongodb.Collection;

    constructor(db: mongodb.Db) {
        this.Db = db;
        this.Talk = db.collection("tracks");
        this.Speakers = db.collection("speakers")
    }
}

