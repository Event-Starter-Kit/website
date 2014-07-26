module.exports.credentials = {
    mongodb: {
        connectionString: process.env.CONNECTION_STRING || 'mongodb://localhost:27017/WEC-Website',
    },
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
    social: {
        twitter: {
            consumerKey: process.env.TWITTER_CONSUMER_KEY || "Put your consumer key here",
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET || "Put your consumer secret here",
        },
        facebook: {
            consumerKey: process.env.TWITTER_CONSUMER_KEY || "Put your consumer key here",
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET || "Put your consumer secret here",
        }
    }
};
