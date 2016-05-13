import { LoggerBaseClass } from "../../logging/loggerBaseClass";
import { DbContext } from "./dbContext";
import { DbFacility } from "./dbFacility";

export class DbBaseClass extends LoggerBaseClass {
	private dbContext: DbContext;

	constructor() {
        super();

		this.dbContext = new DbContext();
    }

	protected getDatabase(): Promise<DbFacility> {
		this.logger.debug("Retriving DbContext .... ");
		return this.dbContext.getDbContext();
	}
}
