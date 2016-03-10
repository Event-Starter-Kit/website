import { Entitybase } from "./entitybase";
import { AuthorInfo } from "./authorinfo";

export class Talk extends Entitybase {
	public Title: string;
	public Abstract: string;
	public Date: number;
	public Tags: string[];
	public Author: AuthorInfo;
	public Track: string;

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

		this.Title = title;
		this.Abstract = abstract;
		this.Date = Date.now();
		this.Tags = tags;
		this.Author = new AuthorInfo(firstname, lastname, bio);
    }
}