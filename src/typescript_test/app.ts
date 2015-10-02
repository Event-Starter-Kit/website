class LetsSeeIfItCompiles {
	
	private test: string;
	
	constructor(test: string) {
		this.test = test;
	}
	
	doSomething(): void {
		console.log(this.test);
	}
}

var a = new LetsSeeIfItCompiles("message");
a.doSomething();