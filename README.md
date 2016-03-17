# Event Starter Kit Website

Welcome ESK project. if you don't know what ESK is please read these links [link1](https://github.com/Event-Starter-Kit/docs) [link2](http://tostring.it/2014/09/02/introducing-event-starter-kit/) 

To run this application you have to install `Node 4.x` or greather (get it [here](https://nodejs.org/en/)) and an instance  [MongoDB](https://www.mongodb.org/) ([mlab](https://mlab.com/) offers a free MongoDB installation)

## Build tools
if you don't have installed the following tools, please run these commands:

    $ npm install -g gulp
    $ npm install -g typings
    $ npm install -g typescript
    
## First run
Go into the root folder and execute the following commands:

    $ npm install
    $ typings install
   
## Compile from command line
This project uses Typescript, if you don't know what Typescript is, here the definition

>TypeScript lets you write JavaScript the way you really want to.
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open Source.

For more info, take a look [here](http://www.typescriptlang.org/)

From command line runs this command:

    $ gulp default

If you get some errors, please open an issue [here](https://github.com/Event-Starter-Kit/website/issues).

Now you should get a new folder into your repo `Build`. Go there and run `node app.js' and everything should works (see credential section).

The output should looks like this:

<img width="1366" alt="screen shot 2016-03-10 at 00 29 52" src="https://cloud.githubusercontent.com/assets/758620/13654247/40bc2ef0-e657-11e5-8d80-4e5903b44363.png">

## Credentials ##
This website uses some parameters to connect to MongoDB or other services.

To get it work is important to set the appropriate environmental variables with the right values: you find the list of the needed environmental variables in the ```credentials.ts``` in src/config.


```js
export class Mongo {
    public static ConnectionString: string = process.env.MONGODB_CONNECTION_STRING || "mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname";
}
```

Or you can also simply configure them based on your OS. For example, with Mac OS X or Linux you will do

```
$ export MONGODB_CONNECTION_STRING ='mongodb://<dbuser>:<dbpassword>@ds047632.mongolab.com:47632/dbname'
```

>you have to do this for all variables available on ```credentials.ts```

