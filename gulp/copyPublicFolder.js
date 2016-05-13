const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');


// Copy views
gulp.task("copyPublicFolder:dist", () => {
    let source = path.join(conf.paths.src, '/node/public/**/*.*');
    let destination = path.join(conf.paths.dist, "/node/public")

    gulp.src(source)
		.pipe(gulp.dest(destination));
});

gulp.task("copyPublicFolder:serve", () => {
    let source = path.join(conf.paths.src, '/node/public/**/*.*');
    let destination = path.join(conf.paths.tmp, "/node/public")

    gulp.src(source)
		.pipe(gulp.dest(destination));
});
