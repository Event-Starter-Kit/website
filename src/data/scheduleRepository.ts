import { DbBaseClass } from "./dbHelpers/dbBaseClass";
import { Talk } from "./models/talk";

export class ScheduleRepository extends DbBaseClass {
    constructor() {
        super();
    }

    public async getTalks(): Promise<Talk[]> {
		let db = await this.getDatabase();
		let result = await db.Talk
                        .find({})
                        .sort({ "time": 1 })
						.toArray();

       return result;
    }
}
