import * as Interfaces from "../../interfaces";
import { Passport } from "passport";
import { UserRepository } from "../../data/repositories/userRepository";

export class UserSerialization extends Interfaces.ConfigurationModule<Passport> {
	private userRepository: UserRepository;

	constructor(app: Passport) {
		super(app, false);
		this.userRepository = new UserRepository();
	}

	public setup() {
		this.app.serializeUser(this.serializeUser);
		this.app.deserializeUser(this.deserializeUser);
	}

	private async deserializeUser(user: any, done: (err: any, id: any) => void) {
		this.logger.debug("DeserializeUser user.....", user);

		try {
			let usr = await this.userRepository.getUserByFacebookId(user.id);

			done(null, usr);

		} catch (error) {
			done(error, null);
		}
	}

	private serializeUser(user: any, done: (err: any, id: any) => void) {
		this.logger.debug("Serializing user.....", user);
		done(null, user.id);
	}
}
