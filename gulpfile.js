var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var typescript = require("typescript");
var tslint = require("gulp-tslint");
var path = require('path');

// define some compiler options
var tsOptions = {
	noImplicitAny: true,
	target: "ES6",
	experimentalAsyncFunctions: true,
	noExternalResolve: true, // we provide all the file by ourselves, no <reference> is needed
	module: "commonjs" //"AMD" // "commonjs" // values ["AMD", "commonjs", "UMD", "system"]
};

var tsFiles = ["typings/main.d.ts", "typings/main/**/*.d.ts", "src/**/*.ts"];
var source = gulp.src(tsFiles);

gulp.task("tslint", function () {
	return source
		.pipe(tslint())
		.pipe(tslint.report("verbose"));
});

// build with sourcemaps support
gulp.task("build-ts", function () {
	var tsResult = source
		.pipe(sourcemaps.init())
		.pipe(ts(tsOptions));
	return tsResult.js
		.pipe(sourcemaps.write(".", {
			sourceRoot: function (file) {
				var sourceFile = path.join(file.cwd, file.sourceMap.file);
				return path.relative(path.dirname(sourceFile), file.cwd) + "/../../src";  // will probide the right location of the source files relative to the build folder
			}
		}))
		.pipe(gulp.dest("build/Release"));
});

gulp.task("watch", function () {
	gulp.watch(tsFiles, ['build-ts']);
});
