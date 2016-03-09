import { LoggerBaseClass } from "../loggerBaseClass";
import * as credentials from "../config/credentials";
import { Strategy as twitterStrategy} from "passport-twitter";
import { Profile as twitterProfile} from "passport-twitter";
import { Strategy as facebookStrategy} from "passport-facebook";
import { Profile as facebookProfile} from "passport-facebook";
import { OAuth2Strategy as googleStrategy} from "passport-google-oauth";
import { Profile as googleProfile} from "passport-google-oauth";
import { Passport} from "passport";
import { UserRepository } from "../data/userRepository";
import { User } from "../data/models/user";

export class PassportConfig extends LoggerBaseClass {
    private passport: Passport;
    private userRepository: UserRepository;

    constructor(passport: Passport) {
        super();
        this.passport = passport;
        this.userRepository = new UserRepository();

		this.passport.serializeUser(this.serializeUser);
		this.passport.deserializeUser(this.deserializeUser);
    }

	public configureGoogleStrategy() {
		this.passport.use(new googleStrategy({
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

	public configureTwitterStrategy() {
		this.passport.use(new twitterStrategy({
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

    public configureFacebookStrategy() {
        this.passport.use(new facebookStrategy({
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

	private serializeUser(user: any, done: (err: any, id: any) => void) {
		this.logger.debug("Serializing user.....", user);
		done(null, user.id);
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
