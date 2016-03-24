import { ObjectID, BulkWriteResult } from "mongodb";
import { DbBaseClass } from "./dbBaseClass";
import { Entitybase } from "../models/shared/entitybase";
import { ValidationError } from "../../errors/validationError";
import { Validator } from "validator.ts/Validator";
import { PagedResult } from "../models/shared/pagedResult";

export abstract class RepositoryBase<T extends Entitybase> extends DbBaseClass {
    public collectionName: string;
    protected validator: Validator;

    constructor(collectionName: string) {
        super();

        this.validator = new Validator();
        this.collectionName = collectionName;
    }

    public async findById(id: string): Promise<T>;
    public async findById(id: ObjectID): Promise<T>;
    public async findById(id: string | ObjectID): Promise<T> {
        let identifier: any;

        if (id && typeof id === "string") {
            identifier = new ObjectID(id);
        } else {
            identifier = id;
        }


        let db = await this.getDatabase();
        let result = await db.db.collection(this.collectionName)
            .find({ "_id": identifier })
            .limit(1)
            .toArray();

        return result[0];
    }

    public async findOne(query: Object): Promise<T> {
        let db = await this.getDatabase();
        let result = await db.db.collection(this.collectionName)
            .find(query)
            .limit(1)
            .toArray();

        return result[0];
    }

    public async saveOrUpdate(object: T, validationGroups?: string[]): Promise<void> {
        let errors = this.validator.validate(object, {
            groups: validationGroups,
        });

        if (errors && errors.length > 0) {
            throw new ValidationError(errors);
        }

        let db = await this.getDatabase();
        await db.db.collection(this.collectionName)
            .updateOne({ _id: object._id }, object, { upsert: true });
    }

    public async saveMany(objects: T[], query?: Object, validationGroups?: string[]): Promise<BulkWriteResult> {
        let errors = this.validator.validate(objects, {
            groups: validationGroups,
        });

        if (errors && errors.length > 0) {
            throw new ValidationError(errors);
        }

        if (!query) {
            query = {};
        }

        let db = await this.getDatabase();
        let bulk = db.db.collection(this.collectionName).initializeUnorderedBulkOp({});

        for (let obj of objects) {
            bulk.insert(obj);
        }

        let promise = new Promise<BulkWriteResult>((resolve, reject) => {
            bulk.execute((err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });

        return promise;


    }

    public async delete(id: string): Promise<void>;
    public async delete(id: ObjectID): Promise<void>;
    public async delete(id: string | ObjectID): Promise<void> {
        let identifier: any;

        if (id && typeof id === "string") {
            identifier = new ObjectID(id);
        } else {
            identifier = id;
        }

        let db = await this.getDatabase();
        await db.db.collection(this.collectionName)
            .deleteOne({ _id: identifier });
    }

    public async deleteMany(query: Object): Promise<void> {
        let db = await this.getDatabase();
        await db.db.collection(this.collectionName).deleteMany(query);
    }

    public async list(pageIndex: number, pageSize: number, query?: Object, sort?: Object): Promise<PagedResult<T>> {

        if (!query) {
            query = {};
        }

        if (!sort) {
            sort = { creationDate: 1 };
        }

        let db = await this.getDatabase();
        let data = await db.db.collection(this.collectionName)
            .find(query)
            .sort(sort)
            .skip(pageSize * (pageIndex - 1))
            .limit(pageSize)
            .toArray();

        let count = await db.db.collection(this.collectionName)
            .count(query);

        return new PagedResult<T>(pageIndex, pageSize, data, count);
    }
}
