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
    }
};