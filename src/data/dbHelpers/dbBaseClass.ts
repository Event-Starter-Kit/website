import { loggerBaseClass } from '../../loggerBaseClass';
import { dbContext } from './DbContext';
import { dbFacility } from './DbFacility';

import * as mongodb from 'mongodb';

export class dbBaseClass extends loggerBaseClass {
	private dbContext : dbContext;

	constructor() {
        super();

		this.dbContext = new dbContext();
    }
	
	protected getDatabase(): Promise<dbFacility> {
		return this.dbContext.GetDbContext();
	}
}