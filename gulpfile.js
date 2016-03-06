var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var typescript = require("typescript");
var tslint = require("gulp-tslint");
var path = require('path');
var $ = require('gulp-load-plugins')({
	pattern: ["del"]
});

// define some compiler options
var tsOptions = {
	noImplicitAny: true,
	target: "es6",
	experimentalAsyncFunctions: true,
	noExternalResolve: true, // we provide all the file by ourselves, no <reference> is needed
	module: "commonjs" //"AMD" // "commonjs" // values ["AMD", "commonjs", "UMD", "system"]
};

var tsFiles = ["typings/main.d.ts", "typings/main/**/*.d.ts", "src/**/*.ts"];
var source = gulp.src(tsFiles);

gulp.task("superBuild", ["tslint","build-ts"], () => {
	
});

gulp.task("build-ts", ["clean"], () => {
	var tsResult = source
		.pipe(sourcemaps.init())
		.pipe(ts(tsOptions));

	return tsResult.js
		.pipe(sourcemaps.write(".", {
			sourceRoot: (file) => {
				var sourceFile = path.join(file.cwd, file.sourceMap.file);
				return path.relative(path.dirname(sourceFile), file.cwd) + "/../../src";
			}
		}))
		.pipe(gulp.dest("build/Release"));
});

gulp.task("watch", () => {
	gulp.watch(tsFiles, ['build-ts']);
});

gulp.task('clean', () => {
	return $.del(["build/Release/*"]);
});

gulp.task("tslint", () => {
	gulp.src(["src/**/*.ts"])
		.pipe(tslint())
		.pipe(tslint.report("verbose"));
});
