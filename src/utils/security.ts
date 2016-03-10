import * as bcrypt from "bcrypt-nodejs";

export module Security {
	export function generateHash(noHashedString: string) {
		return bcrypt.hashSync(noHashedString, bcrypt.genSaltSync(8));
	}

	export function compareHash(noHashedString: string, hashedString: string) {
		return bcrypt.compareSync(noHashedString, hashedString);
	}
}
