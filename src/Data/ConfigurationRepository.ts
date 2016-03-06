import { DbBaseClass } from "./DbHelpers/DbBaseClass";
import { Configuration } from "./Models/Configuration";

export class ConfigurationRepository extends DbBaseClass {
    constructor() {
        super();
    }

	public async GetConfiguration(): Promise<Configuration> {
		let db = await this.GetDatabase();
		let result = await db.Configuration
			.find({})
			.limit(1)
			.toArray();

		return result[0];
    }
}
