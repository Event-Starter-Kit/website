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
export class Ldap {
    public static ServerUrl: URL = process.env.LDAP_SERVER_URL || "my LDAP server URL";
    public static BindDomain: string = "admin account for the domain (eg. uid=admin,cn=users,dc=example,dc=com)";
    public static BindPassword: string = "admin password";
    public static SearchBase: string = "base search (eg. cn=users,dc=example,dc=com)";
    public static SearchFilter: string = "my search filter";
}
