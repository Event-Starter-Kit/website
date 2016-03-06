import {Entitybase} from "./Entitybase";
import {Talk} from "./Talk";

import * as _ from "underscore";

export class Speaker extends Entitybase {
	public Firstname: string;
	public Lastname: string;
	public Email: string;
	public Twitter: string;
	public Bio: string;
	public AvatarUrl: string;
	public Website: string;
	public Order: number;
	public JobRole: string;
	public Talks: Talk[];

	constructor(firstname: string, lastname: string, bio: string) {

		super();

		this.Firstname = firstname;
		this.Lastname = lastname;
		this.Bio = bio;
	}


	public AddTalk(talk: Talk) {
		this.Talks.push(talk);
	}

	public RemoveTalk(talk: Talk) {
		this.Talks = _.without(this.Talks, _.findWhere(this.Talks, { title: talk.Title }));
	}
}
