import { DbFacility } from "./dbFacility";
import { LoggerBaseClass } from "../../loggerBaseClass";
import * as credentials from "../../config/credentials";
import * as mongodb from "mongodb";

export class DbContext extends LoggerBaseClass {
    private static facility: DbFacility;

    public async GetDbContext(): Promise<DbFacility> {
		 if (!DbContext.facility) {
			let db = await mongodb.MongoClient.connect(credentials.Mongo.ConnectionString);	
			DbContext.facility = new DbFacility(db);
		 }

		 return DbContext.facility;
    }
}

