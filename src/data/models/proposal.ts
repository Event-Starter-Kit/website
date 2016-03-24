import { IsLength, NotEmpty, ValidateNested, MinNumber } from "validator.ts/decorator/Validation";
import {Entitybase} from "./shared/entitybase";
import { AuthorInfo } from "./authorInfo";

export class Proposal extends Entitybase {
    @IsLength(10, 50)
	public title: string;

	@IsLength(80, 500)
	public abstract: string;

	public date: number;

	@NotEmpty()
	public tags: string[];

	@ValidateNested()
	public author: AuthorInfo;

	@MinNumber(0)
	public numberOfVotes: number;

	@MinNumber(0)
	public voteAverage: number;

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

	public increaseVote() {
		this.numberOfVotes++;
	}

	public decreaseVote() {
		this.numberOfVotes--;
	}

	public updateAverage(average: number) {
		this.voteAverage = average;
	}
}

