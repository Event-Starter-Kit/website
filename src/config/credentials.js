module.exports.credentials = {
    mailer: {
        username: process.env.MAILER_USERNAME || 'add your email',
        password: process.env.MAILER_PASSWORD || 'nopassword',
        host: process.env.MAILER_HOST || 'smtp.gmail.com',
        secureConnection: true,
        port: 465
    },
    mailchimp: {
        key: process.env.MAILCHIMP_KEY || 'put here your mailchimp api',
        listId: process.env.MAILCHIMP_LIST_ID || 'aaaaaaaaa'
    },
    session: {
        secretPhrase : process.env.SESSION_SECRET_PHRASE || "my secret session phrase"
    },
    mongo:{
        connectionString: process.env.MONGODB_CONNECTION_STRING || "mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname"
    }
};