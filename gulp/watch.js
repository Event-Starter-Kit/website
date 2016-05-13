const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');

gulp.task('watch:serve', ['browser-sync'], () => {
    let srcFolder = path.join(conf.paths.dist, "/**/*.ts");

    gulp.watch(srcFolder, ['typescript:serve']);
});
