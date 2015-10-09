import { loggerBaseClass } from '../../loggerBaseClass';
import { dbContext } from './dbContext';
import { dbFacility } from './dbFacility';

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