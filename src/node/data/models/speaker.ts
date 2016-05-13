import { IsUrl, NotEmpty, IsEmail, NotEmptyArray, IsLength } from "validator.ts/decorator/Validation";
import {Entitybase} from "./shared/entitybase";
import {Talk} from "./talk";

import * as _ from "underscore";

export class Speaker extends Entitybase {
	@NotEmpty()
	public firstname: string;

	@NotEmpty()
	public lastname: string;

	@IsEmail()
	public email: string;

	@IsUrl()
	public twitter: string;

	@IsLength(80, 500)
	public bio: string;

	@IsUrl()
	public avatarUrl: string;

	@IsUrl()
	public website: string;
	public order: number;
	public jobRole: string;

	@NotEmptyArray()
	public talks: Talk[];

	constructor(firstname: string, lastname: string, bio: string) {

		super();

		this.firstname = firstname;
		this.lastname = lastname;
		this.bio = bio;
	}


	public addTalk(talk: Talk) {
		this.talks.push(talk);
	}

	public removeTalk(talk: Talk) {
		this.talks = _.without(this.talks, _.findWhere(this.talks, { title: talk.title }));
	}
}

