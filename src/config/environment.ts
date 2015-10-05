/*module environment {
	export class running {
		static isDevEnvironment: boolean = (GLOBAL.env != 'dev');
	}
}
*/
const greetings = ['Welcome', 'Willkommen', 'Hey', 'Gruezi'];

export function isDevEnvironment() : boolean{
    return GLOBAL.env == 'dev';
}