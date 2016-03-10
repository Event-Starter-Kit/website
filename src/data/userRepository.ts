import { RepositoryBase } from "./dbHelpers/RepositoryBase";
import { User } from "./models/user";

export class UserRepository extends RepositoryBase<User> {
    constructor() {
        super();
    }

	public async getUserByLocalUsername(email: string): Promise<User> {
        let db = await this.getDatabase();

        let result = await db.Users
            .find({ "Local.Email": email })
            .limit(1)
            .toArray();

        return result[0];
    }

    public async getUserByFacebookId(facebookId: string): Promise<User> {
        let db = await this.getDatabase();

        let result = await db.Users
            .find({ "Facebook.Id": facebookId })
            .limit(1)
            .toArray();

        return result[0];
    }

	public async getUserByGoogleId(googleId: string): Promise<User> {
        let db = await this.getDatabase();

        let result = await db.Users
            .find({ "Google.Id": googleId })
            .limit(1)
            .toArray();

        return result[0];
    }

	public async getUserByTwitterId(twitterId: string): Promise<User> {
        let db = await this.getDatabase();

        let result = await db.Users
            .find({ "Twitter.Id": twitterId })
            .limit(1)
            .toArray();

        return result[0];
    }

    public async saveOrUpdate(user: User): Promise<void> {
        let db = await this.getDatabase();

        await db
			.Users
			.updateOne({ _id: user._id }, user, { upsert: true });
    }
}
