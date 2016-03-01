# gaianet
Gaia Intranet

Welcome to your new project.
To run this application you have to install `Node 4.x` or greather. Get it [here](https://nodejs.org/en/)

## Build tools
if you don't have installed the following tools, please run these commands:

    $ npm install -g gulp
    $ npm install -g typings
    $ npm install -g typescript
    $ npm install -g bower
    
## First run
Go into the root folder and execute the following commands:

    $ npm install
    $ bower install
    $ typings install
   
## Compile from command line
This project uses Typescript, if you don't know what Typescript is, here the definition

>TypeScript lets you write JavaScript the way you really want to.
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open Source.

For more info, take a look [here](http://www.typescriptlang.org/)

From command line runs this command:

    $ gulp build-ts

Probably you'll get some errors during compilation but should be related to our code (not all typescript definitions are updated) and in any case everything should work.

![Compilation errors](https://cloud.githubusercontent.com/assets/758620/13394673/45aec04a-deea-11e5-8b80-81ba60eaaa17.png)

Now you should get a new folder into your repo `Build/Release`. Go there and run `node app.js' and everything should works (see credential section)

## Credentials ##
This website uses some parameters to connect to MongoDB or other services.

To get it work is important to set the appropriate environmental variables with the right values: you find the list of the needed environmental variables in the ```credentials.ts``` in src/config.


```js
export class Mongo {
    public static ConnectionString: string = process.env.MONGODB_CONNECTION_STRING || "mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname";
}
export class Ldap {
    public static ServerUrl: URL = process.env.LDAP_SERVER_URL || "my LDAP server URL";
    public static BindDomain: string = "admin account for the domain (eg. uid=admin,cn=users,dc=example,dc=com)";
    public static BindPassword: string = "admin password";
    public static SearchBase: string = "base search (eg. cn=users,dc=example,dc=com)";
    public static SearchFilter: string = "my search filter";
}
```

Or you can also simply configure them based on your OS. For example, with Mac OS X or Linux you will do

```
$ export MONGODB_CONNECTION_STRING ='mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname'
```

>you have to do this for all variables available on ```credentials.ts```

