const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');


// Copy views
gulp.task("copyPublicFolder:dist", () => {
    let source = path.join(conf.paths.src, '/public/**/*.*');
    let destination = path.join(conf.paths.dist, "/public")

    gulp.src(source)
		.pipe(gulp.dest(destination));
});
