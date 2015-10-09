import {entitybase} from './entitybase';
import {authorInfo} from './authorInfo';
import {talk} from './talk';

import * as _ from 'underscore';

export class speaker extends entitybase {
	firstname: string;
	lastname: string;
	email: string;
	twitter: string;
	bio: string;
	avatarUrl: string;
	website: string;
	order: number;
	jobRole: string;
	talks: talk[];

	constructor(firstname: string, lastname: string, bio: string) {

		super();

		this.firstname = firstname;
		this.lastname = lastname;
		this.bio = bio;
	}


	addTalk(talk: talk) {
		this.talks.push(talk);
	}

	removeTalk(talk: talk) {
		this.talks = _.without(this.talks, _.findWhere(this.talks, { title: talk.title }));
	}
}

