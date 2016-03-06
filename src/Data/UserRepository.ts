import { DbBaseClass } from "./dbHelpers/dbBaseClass";
import { User } from "./Models/User";

export class UserRepository extends DbBaseClass {
    constructor() {
        super();
    }

    public async GetUserByFacebookId(facebookId: string): Promise<User> {
        let db = await this.GetDatabase();

        let result = await db.Users
            .find({ "Facebook.Id": facebookId })
            .limit(1)
            .toArray();

        return result[0];
    }

    public async SaveOrUpdate(user: User): Promise<void> {
        let db = await this.GetDatabase();

        await db
			.Users
			.updateOne({ _id: user._id }, user, { upsert: true });
    }
}
