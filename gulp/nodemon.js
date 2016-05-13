const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const path = require('path');
const conf = require('./conf');

gulp.task('nodemon:serve', ['typescript:serve'], (cb) => {
    let startupFile = path.join('./', conf.paths.tmp, conf.paths.startupFile);

    let started = false;

    return nodemon({
        script: startupFile,
        env: {
            'ENVIRONMENT': 'dev',
            'VIEW_PATH': '/../src/views',
            'PUBLIC_PATH': '/../src/public'
        }
    }).on('start', () => {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});
