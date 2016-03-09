import { Interfaces } from "../interfaces";
import { Passport } from "passport";
import { Strategy as facebookStrategy} from "passport-facebook";
import { Profile as facebookProfile} from "passport-facebook";
import { UserRepository } from "../../data/userRepository";
import { User } from "../../data/models/user";
import * as credentials from "../../setup/credentials";

export class Facebook extends Interfaces.ConfigurationModule<Passport> {
	private userRepository: UserRepository;

	constructor(app: Passport) {
		super(app, true);
		this.userRepository = new UserRepository();
	}

	public setup() {
		this.app.use(new facebookStrategy({
            callbackURL: credentials.Facebook.callbackURL,
            clientID: credentials.Facebook.clientID,
            clientSecret: credentials.Facebook.clientSecret,
            profileFields: ["id", "name", "email", "user_hometown", "user_location", "user_photos"],
        },
			async (accessToken: string,
				refreshToken: string,
				profile: facebookProfile,
				done: (error: any, user?: any) => void) => {

				try {

					this.logger.debug("Retriving user with facebook id: " + profile.id);
					let user = await this.userRepository.getUserByFacebookId(profile.id);

					let displayName = profile.name.givenName + " " + profile.name.familyName;
					let email = (profile.emails[0].value || "").toLowerCase();

					if (user) {
						this.logger.debug("Updating existing users with facebook stuff....");

						user.updateFacebookInformation(profile.id, accessToken, email, displayName, true);

						await this.userRepository.saveOrUpdate(user);

						return done(null, user); // user found, return that user
					}

					this.logger.debug("Creating new user with facebook response....");
					user = User.createUserFromFacebook(profile.id, accessToken, email, displayName);

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
