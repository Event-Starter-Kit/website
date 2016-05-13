const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');


// Copy views
gulp.task("copyViews:dist", () => {
    let viewPath = path.join(conf.paths.src, '/app/**/*.{html,htm}');
    let destinationPath = path.join(conf.paths.dist, "/views")
	gulp.src(viewPath)
		.pipe(gulp.dest(destinationPath));
});
