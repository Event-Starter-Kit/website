# Web European Conference Website

## Set up

Install Node.js and then:

	$ sudo npm install -g bower
	$ sudo npm install -g grunt-cli
	$ sudo npm install -g karma
	
Go inside `./src` folder

    $ npm install
    $ bower install
    
Go inside `./grunt` folder

    $ npm install
    $ bower install

This will set up the development environment and download any dependencies.

## Credentials ##

This website uses different socials (Twitter, Facebook, Mailchimp and so on) for several services like authentication, newsletter.

To get it work is important to set the appropriate value.
There are two ways to do that:

1) Edit [configuration.js](https://github.com/Web-European-Conference/website/blob/master/src/config/credentials.js) file or set the environmental variables with the right values: you find the list of the needed environmental variables.

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

## Watch & serve ##

```
$ cd grunt
$ grunt serve
```

is not necessary Start and Stop the web server, Nodemon will monitoring all src folder (*.js) and restart the webserver when something changes.

