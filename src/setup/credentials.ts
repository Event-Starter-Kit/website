export class Mailer {
    public static username: string = process.env.MAILER_USERNAME || "add your email";
    public static password: string = process.env.MAILER_PASSWORD || "nopassword";
    public static host: string = process.env.MAILER_HOST || "smtp.gmail.com";
    public static secureConnection: boolean = true;
    public static port: number = 465;
}
export class Mailchimp {
    public static key: string = process.env.MAILCHIMP_KEY || "put here your mailchimp api";
    public static listId: string = process.env.MAILCHIMP_LIST_ID || "aaaaaaaaa";
}
export class Session {
    public static secretPhrase: string = process.env.SESSION_SECRET_PHRASE || "my secret session phrase";
}
export class Mongo {
    public static connectionString: string = process.env.MONGODB_CONNECTION_STRING || "mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname";
}
export class Eventbrite {
    public static apiKey: string = process.env.EVENTBRITE_API_KEY || "my secret api key";
}
export class Facebook {
    public static clientID: string = process.env.FACEBOOK_CLIENT_ID || "your-secret-clientID-here";
    public static clientSecret: string = process.env.FACEBOOK_CLIENT_SECRET || "your-client-secret-here";
    public static callbackURL: string = process.env.FACEBOOK_CLIENT_CALLBACK || "http://localhost:5000/auth/facebook/callback";
}
export class Twitter {
    public static consumerKey: string = process.env.TWITTER_CONSUMER_KEY || "your-consumer-key-here";
    public static consumerSecret: string = process.env.TWITTER_CONSUMER_SECRET || "your-consumer-secret-here";
    public static callbackURL: string = process.env.TWITTER_CLIENT_CALLBACK || "http://localhost:5000/auth/twitter/callback";
}
export class Google {
    public static clientID: string = process.env.GOOGLE_CLIENT_ID || "your-secret-clientID-here";
    public static clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || "your-client-secret-here";
    public static callbackURL: string = process.env.GOOGLE_CLIENT_CALLBACK || "http://localhost:5000/auth/google/callback";
}
