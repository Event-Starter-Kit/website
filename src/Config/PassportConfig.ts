import { LoggerBaseClass } from "../loggerBaseClass";
import * as credentials from "../config/credentials";
import { Strategy as twitterStrategy} from "passport-twitter";
import { Profile as twitterProfile} from "passport-twitter";
import { Strategy as facebookStrategy} from "passport-facebook";
import { Profile as facebookProfile} from "passport-facebook";
import { OAuth2Strategy as googleStrategy} from "passport-google-oauth";
import { Profile as googleProfile} from "passport-google-oauth";
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

	public ConfigureGoogleStrategy() {
		this.passport.use(new googleStrategy({
			callbackURL: credentials.Google.CallbackURL,
			clientID: credentials.Google.ClientID,
			clientSecret: credentials.Google.ClientSecret,
		},
			async (accessToken: string,
				refreshToken: string,
				profile: twitterProfile,
				done: (error: any, user?: any) => void) => {
				try {
					this.Logger.debug("Retriving user with google id: " + profile.id);
					let user = await this.userRepository.GetUserByTwitterId(profile.id);

					let email = (profile.emails[0].value || "").toLowerCase(); // pull the first email

					if (user) {
						this.Logger.debug("Updating existing users with google stuff....");

						user.UpdateGoogleInformation(profile.id, accessToken, email, profile.displayName, true);

						await this.userRepository.SaveOrUpdate(user);

						return done(null, user); // user found, return that user
					}

					this.Logger.debug("Creating new user with google response....");

					user = User.CreateUserFromGoogle(profile.id, accessToken, email, profile.displayName);

					this.Logger.debug("Storing.....", user);

					await this.userRepository.SaveOrUpdate(user);

					return done(null, user);
				} catch (error) {
					this.Logger.error(error);
					return done(error, null);
				}
			}));
	}

	public ConfigureTwitterStrategy() {
		this.passport.use(new twitterStrategy({
			callbackURL: credentials.Twitter.CallbackURL,
			consumerKey: credentials.Twitter.ConsumerKey,
			consumerSecret: credentials.Twitter.ConsumerSecret,
		},
			async (accessToken: string,
				refreshToken: string,
				profile: twitterProfile,
				done: (error: any, user?: any) => void) => {
				try {
					this.Logger.debug("Retriving user with twitter id: " + profile.id);
					let user = await this.userRepository.GetUserByTwitterId(profile.id);

					if (user) {
						this.Logger.debug("Updating existing users with twitter stuff....");

						user.UpdateTwitterInformation(profile.id, accessToken, profile.username, true);
						await this.userRepository.SaveOrUpdate(user);

						return done(null, user); // user found, return that user
					}

					this.Logger.debug("Creating new user with twitter response....");
					user = User.CreateUserFromTwitter(profile.id, accessToken, profile.username);

					this.Logger.debug("Storing.....", user);

					await this.userRepository.SaveOrUpdate(user);

					return done(null, user);
				} catch (error) {
					this.Logger.error(error);
					return done(error, null);
				}
			}));
	}

    public ConfigureFacebookStrategy() {
        this.passport.use(new facebookStrategy({
            callbackURL: credentials.Facebook.CallbackURL,
            clientID: credentials.Facebook.ClientID,
            clientSecret: credentials.Facebook.ClientSecret,
            profileFields: ["id", "name", "email", "user_hometown", "user_location", "user_photos"],
        },
			async (accessToken: string,
				refreshToken: string,
				profile: facebookProfile,
				done: (error: any, user?: any) => void) => {

				try {

					this.Logger.debug("Retriving user with facebook id: " + profile.id);
					let user = await this.userRepository.GetUserByFacebookId(profile.id);

					let displayName = profile.name.givenName + " " + profile.name.familyName;
					let email = (profile.emails[0].value || "").toLowerCase();

					if (user) {
						this.Logger.debug("Updating existing users with facebook stuff....");

						user.UpdateFacebookInformation(profile.id, accessToken, email, displayName, true);

						await this.userRepository.SaveOrUpdate(user);

						return done(null, user); // user found, return that user
					}

					this.Logger.debug("Creating new user with facebook response....");
					user = User.CreateUserFromFacebook(profile.id, accessToken, email, displayName);

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
