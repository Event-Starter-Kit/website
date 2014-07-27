# Logging #

The website is using [Winston](https://github.com/flatiron/winston) like logger, and there is an instance associated to the **app**.

If you need to log something, you can retrieve the logging from the app like this:

```
var logger = require("./utils/logger.js");

module.exports.initialize = function initialize() {
	logger.info("Logging something");
}
```
## How can I change Winston configuration? ##

Windston is configured in the app, so you have to edit [logger.js](https://github.com/imperugo/Just4Bug/blob/master/app/utilis/logger.js)

## Logging Levels ##

```
//
// Any logger instance
//
logger.log('silly', "127.0.0.1 - there's no place like home");
logger.log('debug', "127.0.0.1 - there's no place like home");
logger.log('verbose', "127.0.0.1 - there's no place like home");
logger.log('info', "127.0.0.1 - there's no place like home");
logger.log('warn', "127.0.0.1 - there's no place like home");
logger.log('error', "127.0.0.1 - there's no place like home");
logger.info("127.0.0.1 - there's no place like home");
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home");

//
// Default logger
//
winston.log('info', "127.0.0.1 - there's no place like home");
winston.info("127.0.0.1 - there's no place like home");
```

More info [here](https://github.com/flatiron/winston).
