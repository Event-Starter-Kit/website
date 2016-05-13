const gulp = require('gulp');
const tslint = require("gulp-tslint");
const path = require('path');
const conf = require('./conf');

// Run tslint on src folder
gulp.task("tslint", () => {
    var srcPath = path.join(conf.paths.src, '/**/*.ts')
	gulp.src([srcPath])
		.pipe(tslint())
		.pipe(tslint.report("verbose"));
});
