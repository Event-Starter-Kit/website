export class authorInfo {
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