import { Interfaces } from "../interfaces";
import { Passport } from "passport";
import { UserRepository } from "../../data/userRepository";

export class Facebook extends Interfaces.ConfigurationModule<Passport> {
	private userRepository: UserRepository;

	constructor(app: Passport) {
		super(app, false);
		this.userRepository = new UserRepository();
	}

	public setup() {
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
}
