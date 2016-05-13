import * as Interfaces from "../../interfaces";
import { Passport } from "passport";
import { OAuth2Strategy as googleStrategy} from "passport-google-oauth";
import { Profile as googleProfile} from "passport-google-oauth";
import { UserRepository } from "../../data/repositories/userRepository";
import { User } from "../../data/models/user";
import * as credentials from "../../setup/credentials";

export class Google extends Interfaces.ConfigurationModule<Passport> {
	private userRepository: UserRepository;

	constructor(app: Passport) {
		super(app, true);
		this.userRepository = new UserRepository();
	}

	public setup() {
		this.app.use(new googleStrategy({
			callbackURL: credentials.Google.callbackURL,
			clientID: credentials.Google.clientID,
			clientSecret: credentials.Google.clientSecret,
		},
			async (accessToken: string,
				refreshToken: string,
				profile: googleProfile,
				done: (error: any, user?: any) => void) => {
				try {
					this.logger.debug("Retriving user with google id: " + profile.id);
					let user = await this.userRepository.getUserByTwitterId(profile.id);

					let email = (profile.emails[0].value || "").toLowerCase(); // pull the first email

					if (user) {
						this.logger.debug("Updating existing users with google stuff....");

						user.updateGoogleInformation(profile.id, accessToken, email, profile.displayName, true);

						await this.userRepository.saveOrUpdate(user);

						return done(null, user); // user found, return that user
					}

					this.logger.debug("Creating new user with google response....");

					user = User.createUserFromGoogle(profile.id, accessToken, email, profile.displayName);

					this.logger.debug("Storing.....", user);

					await this.userRepository.saveOrUpdate(user);

					return done(null, user);
				} catch (error) {
					this.logger.error(error);
					return done(error, null);
				}
			}));
	}
}
