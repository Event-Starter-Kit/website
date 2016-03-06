import { DbBaseClass } from "./dbHelpers/dbBaseClass";
import { Speaker } from "./Models/Speaker";

export class SpeakerRepository extends DbBaseClass {

    constructor() {
        super();
    }

    public async GetTalks(): Promise<Speaker[]> {
		let db = await this.GetDatabase();
		let result = await db.Speakers
					.find({})
					.sort({ "order": 1 })
					.toArray();

		return result;
    }
}
