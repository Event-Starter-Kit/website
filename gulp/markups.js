'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('markups:serve', ['inject:serve'], () => {
    let src = path.join(conf.paths.src, '/app/**/*.*');
    let exclude = "!" + path.join(conf.paths.src, '/app/**/*.html');

    return gulp.src([src, exclude])
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/app/')))
        .pipe(browserSync.stream());
});
