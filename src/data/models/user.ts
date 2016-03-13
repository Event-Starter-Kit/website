import { ValidateNested, NotEmpty, IsEmail } from "validator.ts/decorator/Validation";
import {Entitybase} from "./entitybase";
import {Security} from "../../utils/security";

export class User extends Entitybase {
    constructor() {
		super();
	}

	public DisplayName: string;
	public Email: string;

	@ValidateNested()
	public Facebook: Facebook;

	@ValidateNested()
	public Twitter: Twitter;

	@ValidateNested()
	public Google: Google;

	@ValidateNested()
	public Local: Local;

	public static createUserFromLocal(
		email: string,
		password: string) {

		let usr = new User();
		usr.DisplayName = name;
		usr.Email = email.toLocaleLowerCase();
		usr.Local = new Local();
		usr.Local.Email = email;
		usr.Local.Password = Security.generateHash(password);

		return usr;
	}

	public static createUserFromFacebook(
		id: string,
		token: string,
		email: string,
		name: string) {

		let usr = new User();
		usr.DisplayName = name;
		usr.Email = email;
		usr.Facebook = new Facebook();
		usr.Facebook.Id = id;
		usr.Facebook.Token = token;
		usr.Facebook.Email = email;
		usr.Facebook.Name = name;

		return usr;
	}

	public static createUserFromGoogle(
		id: string,
		token: string,
		email: string,
		name: string) {

		let usr = new User();
		usr.DisplayName = name;
		usr.Email = email;
		usr.Google = new Google();
		usr.Google.Id = id;
		usr.Google.Token = token;
		usr.Google.Email = email;
		usr.Google.Name = name;

		return usr;
	}

	public static createUserFromTwitter(
		id: string,
		token: string,
		username: string) {

		let usr = new User();
		usr.DisplayName = name;
		usr.Twitter = new Twitter();
		usr.Twitter.Id = id;
		usr.Twitter.Token = token;
		usr.Twitter.Username = username;

		return usr;
	}

	public updateFacebookInformation(
		id: string,
		token: string,
		email: string,
		name: string,
		updateMainInfo: boolean) {

		this.Facebook.Id = id;
		this.Facebook.Token = token;
		this.Facebook.Email = email;
		this.Facebook.Name = name;

		if (updateMainInfo) {
			this.DisplayName = name;
			this.Email = email;
		}
	}

	public updateGoogleInformation(
		id: string,
		token: string,
		email: string,
		name: string,
		updateMainInfo: boolean) {

		this.Google.Id = id;
		this.Google.Token = token;
		this.Google.Email = email;
		this.Google.Name = name;

		if (updateMainInfo) {
			this.DisplayName = name;
			this.Email = email;
		}
	}

	public updateTwitterInformation(
		id: string,
		token: string,
		username: string,
		updateMainInfo: boolean) {

		this.Twitter.Id = id;
		this.Twitter.Token = token;
		this.Twitter.Username = username;

		if (updateMainInfo) {
			this.DisplayName = username;
		}
	}

	public validatePassword(password: string) {
		return Security.compareHash(password, this.Local.Password);
	}
}

class Local {

	@IsEmail()
	public Email: string;

	@NotEmpty()
	public Password: string;
}

class Facebook {
    @NotEmpty()
	public Id: string;

	public Token: string;

	@IsEmail()
	public Email: string;

	@NotEmpty()
    public Name: string;
}

class Twitter {
    @NotEmpty()
	public Id: string;

	public Token: string;

	@NotEmpty()
    public DisplayName: string;

	@NotEmpty()
    public Username: string;
}

class Google {
	@NotEmpty()
    public Id: string;

	public Token: string;

	@IsEmail()
    public Email: string;

	@NotEmpty()
    public Name: string;
}

