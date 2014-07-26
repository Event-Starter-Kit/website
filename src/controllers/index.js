(function(controllers) {
    var logger = require("../utils/logger");
    var requires = require("../utils/requireAll");
    var ctrls = requires.requireAll(__dirname + '/');

    controllers.init = function(app) {
        ctrls.forEach(function(ctrl) {
            ctrl.init(app);
        });
    };

})(module.exports);