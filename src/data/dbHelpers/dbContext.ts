import { DbFacility } from "./dbFacility";
import { LoggerBaseClass } from "../../logging/loggerBaseClass";
import * as credentials from "../../setup/credentials";
import {Configuration} from "../models/configuration";
import * as mongodb from "mongodb";

export class DbContext extends LoggerBaseClass {
    private static facility: DbFacility;

    public async getDbContext(): Promise<DbFacility> {
		if (!DbContext.facility) {
			this.logger.info("Connecting to mongodb .....");
			let db = await mongodb.MongoClient.connect(credentials.Mongo.connectionString);
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
