import { ObjectID } from "mongodb";
import { DbBaseClass } from "../dbHelpers/dbBaseClass";

export abstract class RepositoryBase<T> extends DbBaseClass {
	public async findById(id: ObjectID): Promise<T> {
		let db = await this.getDatabase();
		let result = await db.Talk
			.find({ "_id": id })
			.limit(1)
			.toArray();

		return result[0];
    }
}
