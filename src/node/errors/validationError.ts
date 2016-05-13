import * as ValidationErrorInterface from "validator.ts/ValidationErrorInterface";

export class ValidationError extends Error {
	public validationMessages: ValidationErrorInterface.ValidationErrorInterface[];

	constructor(errors: ValidationErrorInterface.ValidationErrorInterface[]) {
		super("There are some invalid fields.");
		this.name = "ValidationError";
		this.validationMessages = errors;
	}

	public toString() {
		return this.message;
	}
}
