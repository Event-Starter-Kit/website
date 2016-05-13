import * as mongodb from "mongodb";

export class DbFacility {
    public db: mongodb.Db;
    public talk: mongodb.Collection;
    public speakers: mongodb.Collection;
    public users: mongodb.Collection;
	public configuration: mongodb.Collection;

    constructor(db: mongodb.Db) {
        this.db = db;
        this.talk = db.collection("tracks");
        this.speakers = db.collection("speakers");
        this.users = db.collection("users");
		this.configuration = db.collection("configurations");
    }
}

