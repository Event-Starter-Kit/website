const greetings = ['Welcome', 'Willkommen', 'Hey', 'Gruezi'];

export function isDevEnvironment() : boolean{
    return global.env == 'dev';
}