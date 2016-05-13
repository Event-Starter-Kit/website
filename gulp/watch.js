const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');

gulp.task('watch:serve', ['browser-sync'], () => {
    let srcFolder = path.join(conf.paths.tmp, "/**/*.ts");

    gulp.watch(srcFolder, ['typescript:serve']);

    gulp.watch([path.join(conf.paths.src, '/app/**/*.html')], ['inject-reload']);
});
