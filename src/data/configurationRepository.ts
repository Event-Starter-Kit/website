import { RepositoryBase } from "./dbHelpers/RepositoryBase";
import { Configuration } from "./models/configuration";

export class ConfigurationRepository extends RepositoryBase<Configuration> {
    constructor() {
        super();
    }

	public async getConfiguration(): Promise<Configuration> {
		let db = await this.getDatabase();
		let result = await db.Configuration
			.find({})
			.limit(1)
			.toArray();

		return result[0];
    }
}
