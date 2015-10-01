(function (requireAll) {
  var logger = require("./logger");

  requireAll.requireAll = function(foldername){
    var ctrls = [];

    require('fs')
      .readdirSync(foldername)
        .forEach(function(file) {
          if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
            var name = file.replace('.js', '');

            logger.debug("Requiring '" + name + "' from '" + foldername + "/" + file +"''");

            var ctrl = require(foldername + file);

            ctrls.push(ctrl);
          }
        });

    return ctrls;
  };

})(module.exports);
