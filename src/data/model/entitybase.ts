export class entitybase{
	id :string;
	creationDate: number;
	
	constructor(){
		this.creationDate = Date.now();
	}
}