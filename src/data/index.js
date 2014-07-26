(function(repositories) {

	var database = require("./mongodb");
	var requires = require("../utils/requireAll");

	var ctrls = requires.requireAll(__dirname + '/');

    repositories.init = function(app) {
        ctrls.forEach(function(ctrl) {
            ctrl.init(app,database);
        });
    };

    repositories.database = database;

})(module.exports);