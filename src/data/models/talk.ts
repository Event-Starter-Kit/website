import { ValidateNested, NotEmptyArray, IsLength } from "validator.ts/decorator/Validation";
import {Entitybase} from "./shared/entitybase";
import { AuthorInfo } from "./authorinfo";

export class Talk extends Entitybase {
	@IsLength(10, 50)
	public title: string;

	@IsLength(80, 500)
	public abstract: string;
	public date: number;

	@NotEmptyArray()
	public tags: string[];

	@ValidateNested()
	public author: AuthorInfo;
	public track: string;

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
		this.author = new AuthorInfo(firstname, lastname, bio);
    }
}
