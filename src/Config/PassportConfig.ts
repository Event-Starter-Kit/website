import { LoggerBaseClass } from "../loggerBaseClass";
import * as credentials from "../config/credentials";
import { Strategy as facebookStrategy} from "passport-facebook";
import { Profile as facebookProfile} from "passport-facebook";
import { Passport} from "passport";
import { UserRepository } from "../Data/UserRepository";
import { User } from "../Data/Models/User";

export class PassportConfig extends LoggerBaseClass {
    private passport: Passport;
    private userRepository: UserRepository;

    constructor(passport: Passport) {
        super();
        this.passport = passport;
        this.userRepository = new UserRepository();

		this.passport.serializeUser(this.SerializeUser);
		this.passport.deserializeUser(this.DeserializeUser);
    }

    public ConfigureFacebookStrategy() {
        this.passport.use(new facebookStrategy({
            callbackURL: credentials.Facebook.CallbackURL,
            clientID: credentials.Facebook.ClientID,
            clientSecret: credentials.Facebook.ClientSecret,
            profileFields: ["id", "name", "email"],
        },
			async (accessToken: string,
				refreshToken: string,
				profile: facebookProfile,
				done: (error: any, user?: any) => void) => {

				try {

					this.Logger.debug("Retriving user with facebook id: " + profile.id);
					let user = await this.userRepository.GetUserByFacebookId(profile.id);

					if (user) {
						this.Logger.debug("Updating existing users with facebook stuff....");
						// if there is a user id already but no token (user was linked at one point and then removed)
						if (!user.Facebook.Token) {
							user.Facebook.Token = refreshToken;
							user.Facebook.Name = profile.name.givenName + " " + profile.name.familyName;
							user.Facebook.Email = (profile.emails[0].value || "").toLowerCase();

							await this.userRepository.SaveOrUpdate(user);
						}

						return done(null, user); // user found, return that user
					}

					this.Logger.debug("Creating new user with facebook response....");
					// if there is no user, create them
					user = new User();
					user.Facebook.Id = profile.id;
					user.Facebook.Token = refreshToken;
					user.Facebook.Name = profile.name.givenName + " " + profile.name.familyName;
					user.Facebook.Email = (profile.emails[0].value || "").toLowerCase();

					this.Logger.debug("Storing.....", user);

					await this.userRepository.SaveOrUpdate(user);
					return done(null, user);
				} catch (error) {
					this.Logger.error(error);
					return done(error, null);
				}
			}));
    }

	private SerializeUser(user: any, done: (err: any, id: any) => void) {
		this.Logger.debug("Serializing user.....", user);
		done(null, user.id);
	}

	private async DeserializeUser(user: any, done: (err: any, id: any) => void) {
		this.Logger.debug("DeserializeUser user.....", user);

		try {
			let usr = await this.userRepository.GetUserByFacebookId(user.id);

			done(null, usr);

		} catch (error) {
			done(error, null);
		}
	}
}
