import { DbFacility } from "./dbFacility";
import { LoggerBaseClass } from "../../loggerBaseClass";
import * as credentials from "../../config/credentials";
import * as mongodb from "mongodb";

export class DbContext extends LoggerBaseClass {
    private facility: DbFacility;

    public async GetDbContext(): Promise<DbFacility> {
		if (!this.facility) {
			this.Logger.info("Connecting to mongodb .....");
			let db = await mongodb.MongoClient.connect(credentials.Mongo.ConnectionString);
			this.facility = new DbFacility(db);
		}

		return this.facility;
    }
}
