/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});


/**
 *  Default task run the build, serve enable the developer mode.
 */
gulp.task('default', ['tslint', 'typescript:dist', 'copyPublicFolder:dist', 'copyViews:dist']);
gulp.task('serve', ['tslint', 'clean:serve', 'watch:serve']);
