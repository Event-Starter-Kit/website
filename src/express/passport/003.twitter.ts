import { Interfaces } from "../interfaces";
import { Passport } from "passport";
import { Strategy as twitterStrategy} from "passport-twitter";
import { Profile as twitterProfile} from "passport-twitter";
import { UserRepository } from "../../data/repositories/userRepository";
import { User } from "../../data/models/user";
import * as credentials from "../../setup/credentials";

export class Twitter extends Interfaces.ConfigurationModule<Passport> {
	private userRepository: UserRepository;

	constructor(app: Passport) {
		super(app, true);
		this.userRepository = new UserRepository();
	}

	public setup() {
		this.app.use(new twitterStrategy({
			callbackURL: credentials.Twitter.callbackURL,
			consumerKey: credentials.Twitter.consumerKey,
			consumerSecret: credentials.Twitter.consumerSecret,
		},
			async (accessToken: string,
				refreshToken: string,
				profile: twitterProfile,
				done: (error: any, user?: any) => void) => {
				try {
					this.logger.debug("Retriving user with twitter id: " + profile.id);
					let user = await this.userRepository.getUserByTwitterId(profile.id);

					if (user) {
						this.logger.debug("Updating existing users with twitter stuff....");

						user.updateTwitterInformation(profile.id, accessToken, profile.username, true);
						await this.userRepository.saveOrUpdate(user);

						return done(null, user); // user found, return that user
					}

					this.logger.debug("Creating new user with twitter response....");
					user = User.createUserFromTwitter(profile.id, accessToken, profile.username);

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
