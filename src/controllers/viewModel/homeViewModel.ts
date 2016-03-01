import * as express from "express";
import {ModelBase} from "./modelBase";
import {Talk} from "../../data/model/talk";


export class HomeViewModel extends ModelBase {
	public talks: Talk[];

	constructor(req: express.Request) {
		super(req);
	}
}
