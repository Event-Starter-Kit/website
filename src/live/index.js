(function(live) {
    var socketio = require("socket.io");
    var logger = require("../utils/logger");

    live.init = function(server) {
        var io = socketio.listen(server);

        logger.debug("Configuring Socket.io");

        io.sockets.on("connection", function(socket) {

            logger.info("socket was connected");

        });
    };

})(module.exports);
