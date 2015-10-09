export class mailer {
    static username: string = process.env.MAILER_USERNAME || 'add your email';
    static password: string = process.env.MAILER_PASSWORD || 'nopassword';
    static host: string = process.env.MAILER_HOST || 'smtp.gmail.com';
    static secureConnection: boolean = true;
    static port: number = 465;
}
export class mailchimp {
    static key: string = process.env.MAILCHIMP_KEY || 'put here your mailchimp api';
    static listId: string = process.env.MAILCHIMP_LIST_ID || 'aaaaaaaaa';
}
export class session {
    static secretPhrase: string = process.env.SESSION_SECRET_PHRASE || "my secret session phrase"
}
export class mongo {
    static connectionString: string = process.env.MONGODB_CONNECTION_STRING || "mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname"
}
export class eventbrite {
    static apiKey: string = process.env.EVENTBRITE_API_KEY || "my secret api key"
}