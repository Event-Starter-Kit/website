import {ObjectID} from "mongodb";

export class Entitybase {
	public _id: ObjectID;
	public CreationDate: number;

	constructor() {
		if (this._id == null) {
			this._id = new ObjectID();
		}

		this.CreationDate = Date.now();
	}
}
