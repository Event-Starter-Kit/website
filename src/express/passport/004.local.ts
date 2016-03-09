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
		this.logger.debug("Adding local strategy for Passport.");
	 }
}
