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
		this.app.serializeUser(this.serializeUser);
	}

	private serializeUser(user: any, done: (err: any, id: any) => void) {
		this.logger.debug("Serializing user.....", user);
		done(null, user.id);
	}
}
