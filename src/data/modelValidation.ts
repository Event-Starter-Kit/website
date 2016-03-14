import { ValidationErrorInterface } from "validator.ts/ValidationErrorInterface";
import { Validator as validatorTS } from "validator.ts/Validator";

export interface ModelValidation {
	validate(): ValidationErrorInterface[];
}

export class Validator {
	protected validatorTS: validatorTS;

	constructor() {
		this.validatorTS = new validatorTS();
	}

	public validate(object: any): ValidationErrorInterface[] {

		let errors = this.validatorTS.validate(object);

		if (errors) {
			return errors;
		}

		if (typeof (object.validate) === "undefined") {
			// not safe to use the function
			return undefined;
		}

		return object.validate();
	}
}

