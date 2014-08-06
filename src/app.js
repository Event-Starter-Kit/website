var logger;
var _ = require('underscore');

var env = _.find(process.argv.slice(2), function(arg) {
    if (arg.indexOf('env') === 0) {
        return true;
    }
});

GLOBAL.env = (env !== undefined) ? env.substr(4, 3) : 'prod';

logger = require("./utils/logger");
logger.debug("Initializing development configuration.");

var express = require("express");
var app = express();

var expressConfig = require("./express");

logger.info("configuring express....");
expressConfig.init(app, express);
logger.info("Express configured");

var port = process.env.port || 5000;

app.listen(port, function() {
    logger.info("Listening on " + port);
});

var scheduler = require("./scheduler");
scheduler.init();