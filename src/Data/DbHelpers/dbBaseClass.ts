import { LoggerBaseClass } from "../../LoggerBaseClass";
import { DbContext } from "./DbContext";
import { DbFacility } from "./DbFacility";

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
