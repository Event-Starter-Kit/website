export class Mailer {
    public static Username: string = process.env.MAILER_USERNAME || "add your email";
    public static Password: string = process.env.MAILER_PASSWORD || "nopassword";
    public static Host: string = process.env.MAILER_HOST || "smtp.gmail.com";
    public static SecureConnection: boolean = true;
    public static Port: number = 465;
}
export class Mailchimp {
    public static Key: string = process.env.MAILCHIMP_KEY || "put here your mailchimp api";
    public static ListId: string = process.env.MAILCHIMP_LIST_ID || "aaaaaaaaa";
}
export class Session {
    public static SecretPhrase: string = process.env.SESSION_SECRET_PHRASE || "my secret session phrase";
}
export class Mongo {
    public static ConnectionString: string = process.env.MONGODB_CONNECTION_STRING || "mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname";
}
export class Eventbrite {
    public static ApiKey: string = process.env.EVENTBRITE_API_KEY || "my secret api key"
}
export class Facebook {
    public static ClientID: string = process.env.FACEBOOK_CLIENT_ID || "your-secret-clientID-here";
    public static ClientSecret: string = process.env.FACEBOOK_CLIENT_SECRET || "your-client-secret-here";
    public static CallbackURL: string = process.env.FACEBOOK_CLIENT_CALLBACK || "http://localhost:5000/auth/facebook/callback";
}
export class Twitter {
    public static ConsumerKey: string = process.env.TWITTER_CONSUMER_KEY || "your-consumer-key-here";
    public static ConsumerSecret: string = process.env.TWITTER_CONSUMER_SECRET || "your-consumer-secret-here";
    public static CallbackURL: string = process.env.TWITTER_CLIENT_CALLBACK || "http://localhost:5000/auth/twitter/callback";
}
export class Google {
    public static ClientID: string = process.env.GOOGLE_CLIENT_ID || "your-secret-clientID-here";
    public static ClientSecret: string = process.env.GOOGLE_CLIENT_SECRET || "your-client-secret-here";
    public static CallbackURL: string = process.env.GOOGLE_CLIENT_CALLBACK || "http://localhost:5000/auth/google/callback";
}
