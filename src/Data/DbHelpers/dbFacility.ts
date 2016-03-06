import * as mongodb from "mongodb";

export class DbFacility {
    public Db: mongodb.Db;
    public Talk: mongodb.Collection;
    public Speakers: mongodb.Collection;
    public Users: mongodb.Collection;
	public Configuration: mongodb.Collection;

    constructor(db: mongodb.Db) {
        this.Db = db;
        this.Talk = db.collection("tracks");
        this.Speakers = db.collection("speakers");
        this.Users = db.collection("users");
		this.Configuration = db.collection("configurations");
    }
}

