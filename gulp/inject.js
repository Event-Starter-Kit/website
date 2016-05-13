const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');
const inject = require('gulp-inject');

gulp.task('inject-reload', ['inject:serve'], () => {
    browserSync.reload();
});

gulp.task('inject:serve', () => {
    let cssPath = path.join(conf.paths.src, "/node/public/frontoffice/css/*.css");
    let injectStyles = gulp.src([cssPath], {
        read: false
    });

    var injectCssOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/app')],
        addRootSlash: false,
        transform: (filePath, file, i, length) => {
            let newPath = filePath.replace('node/public/', '');
            return '<link rel="stylesheet" href="/' + newPath + '"/>';
        }
    };

    return gulp.src(path.join(conf.paths.src, "/app/**/*.html"))
        .pipe(inject(injectStyles, injectCssOptions))
        .pipe(gulp.dest(path.join(conf.paths.tmp, "/app")));
});
