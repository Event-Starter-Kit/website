export class Entitybase {
	public Id: string;
	public CreationDate: number;

	constructor(){
		this.CreationDate = Date.now();
	}
}
