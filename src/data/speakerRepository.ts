import { RepositoryBase } from "./dbHelpers/RepositoryBase";
import { Speaker } from "./models/speaker";

export class SpeakerRepository extends RepositoryBase<Speaker> {

    constructor() {
        super();
    }

    public async getTalks(): Promise<Speaker[]> {
		let db = await this.getDatabase();
		let result = await db.Speakers
					.find({})
					.sort({ "order": 1 })
					.toArray();

		return result;
    }
}