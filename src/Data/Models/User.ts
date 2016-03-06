import {Entitybase} from "./Entitybase";

export class User extends Entitybase {
    constructor() {
		super();
		this.Facebook = new Facebook();
		this.Twitter = new Twitter();
		this.Google = new Google();
	}

	public Facebook: Facebook;
    public Twitter: Twitter;
    public Google: Google;
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

