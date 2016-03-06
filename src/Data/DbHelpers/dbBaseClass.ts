import { LoggerBaseClass } from "../../loggerBaseClass";
import { DbContext } from "./dbContext";
import { DbFacility } from "./dbFacility";

export class DbBaseClass extends LoggerBaseClass {
	private dbContext: DbContext;

	constructor() {
        super();

		this.dbContext = new DbContext();
    }

	protected GetDatabase(): Promise<DbFacility> {
		this.Logger.debug("Retriving DbContext .... ");
		return this.dbContext.GetDbContext();
	}
}
