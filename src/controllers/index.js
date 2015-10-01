/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/express/express.d.ts"/>

(function(controllers) {
    var requires = require("../utils/requireAll");
    var ctrls = requires.requireAll(__dirname + '/');

    controllers.init = function(app) {
        ctrls.forEach(function(ctrl) {
            ctrl.init(app);
        });
    };

})(module.exports);
