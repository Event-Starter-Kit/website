import { DbBaseClass } from "./dbHelpers/dbBaseClass";
import { Speaker } from "./model/speaker";

export class SpeakerData extends DbBaseClass {

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
