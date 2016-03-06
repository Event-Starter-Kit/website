export class AuthorInfo {
	public Firstname: string;
	public Lastname: string;
	public email: string;
	public twitter: string;
	public bio: string;
	public avatarUrl: string;

	constructor(firstname: string, lastname: string, bio: string) {
		this.Firstname = firstname;
		this.Lastname = lastname;
		this.bio = bio;
	}
}
