import { Interfaces } from "../interfaces";
import { Passport } from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import { IVerifyOptions } from "passport-local";

import { UserRepository } from "../../data/repositories/userRepository";

export class Facebook extends Interfaces.ConfigurationModule<Passport> {
	private userRepository: UserRepository;

	constructor(app: Passport) {
		super(app, false);
		this.userRepository = new UserRepository();
	}

	public setup() {
		this.logger.debug("Adding local strategy for Passport.");

		this.app.use("local-login", new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
			async (req: any, email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
				if (email) {
					email = email.toLowerCase();
				}

				try {
					this.logger.debug("Retriving local user with email: " + email);
					let user = await this.userRepository.getUserByLocalUsername(email);

					if (!user) {
						return done(null, false, req.flash("loginMessage", "No user found."));
					}

					if (!user.validatePassword(password)) {
						return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
					}

					return done(null, user);
				} catch (error) {
					this.logger.error(error);
					return done(error, null);
				}
			}));
	}
}
