import { DbFacility } from "./DbFacility";
import { LoggerBaseClass } from "../../LoggerBaseClass";
import * as credentials from "../../Config/Credentials";
import {Configuration} from "../Models/Configuration";
import * as mongodb from "mongodb";

export class DbContext extends LoggerBaseClass {
    private static facility: DbFacility;

    public async GetDbContext(): Promise<DbFacility> {
		if (!DbContext.facility) {
			this.Logger.info("Connecting to mongodb .....");
			let db = await mongodb.MongoClient.connect(credentials.Mongo.ConnectionString);
			DbContext.facility = new DbFacility(db);
			let cfgs = await DbContext.facility.Configuration.find({}).limit(1).toArray();

			if (!cfgs || !cfgs[0]) {
				// That's the first start, storing default configuration
				await DbContext.facility.Configuration.insertOne(new Configuration());
			}
		}

		return DbContext.facility;
    }
}
