## Setup ##

The site is built on top of [NodeJs](http://nodejs.org/) and the application requires some packages from the [NPM](https://www.npmjs.org/).

First think to do is install the right packages:

```
# Install grunt and bower
$ npm install -g grunt-cli

$ cd src
$ npm install

$ cd ..

# Install packages
$ npm install
```

## Credentials ##

This website uses Mailchimp for the newsletter and also send emails using node and gmail (in my case, but is configurable).

To get it work is important to set the appropriate environmental variables with the right values: you find the list of the needed environmental variables in the ```credentials.js``` in src/config.

You can do that by specifying them in the `gruntfile.js` as parameter in the `nodemon` plugin, like this.

```js
env: {
    PORT: port,
    MAILER_USERNAME: 'email',
    MAILER_PASSWORD: 'password',
    MAILCHIMP_KEY: 'mailchimp key',
    MAILCHIMP_LIST_ID: 'mailchimp list id',
},
```

Or you can also simply configure them based on your OS. For example, with Mac OS X or Linux you will do

```
$ export MAILER_USERNAME='email'
$ export MAILER_PASSWORD='password'
$ export MAILCHIMP_KEY='mailchimp key'
$ export MAILCHIMP_LIST_ID='mailchimp list id'
```


You can also just change the value directly in that file.

## Watch & serve ##

```
$ grunt
```
is not necessary Start and Stop the web server, Nodemon will monitoring all src folder (*.js)

