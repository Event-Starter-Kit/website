import {Entitybase} from "./Entitybase";

export class User extends Entitybase {
    constructor() {
		super();
	}

	public DisplayName: string;
	public Email: string;

	public Facebook: Facebook;
    public Twitter: Twitter;
    public Google: Google;

	public static CreateUserFromFacebook(
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

	public static CreateUserFromGoogle(
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

	public static CreateUserFromTwitter(
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

	public UpdateFacebookInformation(
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

	public UpdateGoogleInformation(
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

	public UpdateTwitterInformation(
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

}

class Facebook {
    public Id: string;
    public Token: string;
    public Email: string;
    public Name: string;
}

class Twitter {
    public Id: string;
    public Token: string;
    public DisplayName: string;
    public Username: string;
}

class Google {
    public Id: string;
    public Token: string;
    public Email: string;
    public Name: string;
}

