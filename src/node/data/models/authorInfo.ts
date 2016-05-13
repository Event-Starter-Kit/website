import {NotEmpty, IsEmail, IsUrl} from "validator.ts/decorator/Validation";

export class AuthorInfo {
	@NotEmpty()
	public firstname: string;

	@NotEmpty()
	public lastname: string;

	@IsEmail()
	public email: string;

	public twitter: string;
	public bio: string;

	@IsUrl()
	public avatarUrl: string;

	constructor(firstname: string, lastname: string, bio: string) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.bio = bio;
	}
}
