import * as express from 'express';
import {modelBase} from './modelBase';
import {talk} from '../../data/model/talk';


export class homeViewModel extends modelBase {
	talks: talk[];
	
	constructor(req: express.Request) {
		super(req)
	}
}