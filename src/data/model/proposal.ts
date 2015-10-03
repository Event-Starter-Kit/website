export class proposal {
    title: string;
	abstract: string;
	date: Date;
	tags: string[];
	author: author;
	numberOfVotes: number;
	voteAverage: number;

    constructor(title: string,
		abstract: string,
		tags: string[],
		firstname: string,
		lastname: string,
		bio: string) {

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
		this.date = new Date();
		this.tags = tags;
		this.author = new author(firstname,lastname,bio);
    }
	
	increaseVote(){
		this.numberOfVotes++;
	}
	
	decreaseVote(){
		this.numberOfVotes--;
	}
	
	updateAverage(average:number){
		this.voteAverage = average;
	}
}

class author {
	firstname: string;
	lastname: string;
	email: string;
	twitter: string;
	bio: string;
	avatarUrl: string;

	constructor(firstname: string, lastname: string, bio: string) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.bio = bio;
	}
}