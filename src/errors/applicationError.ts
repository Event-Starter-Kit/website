export class ApplicationError extends Error {

	constructor(message: string) {
		super(message);
		this.name = "Exception";
		this.stack = (<any>new Error()).stack;
	}

	public toString() {
		return this.name + ": " + this.message;
	}
}

