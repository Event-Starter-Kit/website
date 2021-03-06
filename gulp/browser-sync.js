const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const path = require('path');
const conf = require('./conf');

// Static server
gulp.task('browser-sync', ['markups:serve','copyPublicFolder:serve','nodemon:serve'], () => {
    let viewPath = path.join(conf.paths.src, '/app/**/*.*');

    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: [viewPath],
        browser: "google chrome",
        port: 7000,
    });

    gulp.watch(viewPath).on('change', browserSync.reload);
});
