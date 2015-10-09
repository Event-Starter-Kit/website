import { entitybase } from './entitybase';
import { authorInfo } from './authorinfo';

export class talk extends entitybase {
	title: string;
	abstract: string;
	date: number;
	tags: string[];
	author: authorInfo;
	trak: string;

	constructor(title: string,
		abstract: string,
		tags: string[],
		firstname: string,
		lastname: string,
		bio: string) {

		super();

		if (title) {
			throw new Error("invalid title");
		}

		if (abstract) {
			throw new Error("invalid abstract");
		}

		if (tags) {
			throw new Error("invalid tags");
		}

		this.title = title;
		this.abstract = abstract;
		this.date = Date.now();
		this.tags = tags;
		this.author = new authorInfo(firstname, lastname, bio);
    }
}