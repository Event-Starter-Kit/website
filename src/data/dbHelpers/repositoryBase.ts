import { ObjectID } from "mongodb";
import { DbBaseClass } from "./dbBaseClass";
import { Entitybase } from "../models/entitybase";
import { Validator } from "validator.ts/Validator";
import { ValidationError } from "../../errors/validationError";
import { Validator as ModelValidationValidator } from "../modelValidation";

export abstract class RepositoryBase<T extends Entitybase> extends DbBaseClass {
	public collectionName: string;
	protected validator: Validator;

	constructor(collectionName: string) {
		super();

		this.validator = new Validator();
		this.collectionName = collectionName;
	}

	public async findById(id: ObjectID): Promise<T> {

		let db = await this.getDatabase();
		let result = await db.db.collection(this.collectionName)
			.find({ "_id": id })
			.limit(1)
			.toArray();

		return result[0];
    }

	public async saveOrUpdate(object: T): Promise<void> {
		let errors = this.validator.validate(object);

		if (errors) {
			throw new ValidationError(errors);
		}

		errors = ModelValidationValidator(object);

		let db = await this.getDatabase();
		await db.db.collection(this.collectionName)
			.updateOne({ _id: object._id }, object, { upsert: true });
	}

	public async delete(id: ObjectID): Promise<void> {
		let db = await this.getDatabase();
		await db.db.collection(this.collectionName)
			.deleteOne({ _id: id });
	}
}
