import { ValidationErrorInterface } from "validator.ts/ValidationErrorInterface";

export interface ModelValidation {
	validate(): ValidationErrorInterface[];
}

export function Validator(object: any): ValidationErrorInterface[] {
	if (typeof (object.validate) === "undefined") {
        // not safe to use the function
       return undefined;
    }

    return object.validate();
}

