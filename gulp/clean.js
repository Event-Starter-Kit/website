const gulp = require('gulp');
const path = require('path');
const del = require('del');
const conf = require('./conf');

// Cleare Dist folder
gulp.task('clean:dist', () => {
    del.sync([path.join(conf.paths.dist, '/*')]);
});

// Cleare Temp folder
gulp.task('clean:serve', () => {
    del.sync([path.join(conf.paths.tmp, '/*')]);
});

// Cleare Temp and Dist folder
gulp.task('clean', () => {
    del.sync([
        path.join(conf.paths.tmp, '/*'),
        path.join(conf.paths.dist, '/*')
    ]);
});
