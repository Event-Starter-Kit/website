import { RepositoryBase } from "../dbHelpers/repositoryBase";
import { Configuration } from "../models/configuration";

export class ConfigurationRepository extends RepositoryBase<Configuration> {
    constructor() {
        super("configurations");
    }

	public async getConfiguration(): Promise<Configuration> {
		let db = await this.getDatabase();
		let result = await db.configuration
			.find({})
			.limit(1)
			.toArray();

		return result[0];
    }
}
