var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var typescript = require("typescript");
var tslint = require("gulp-tslint");
var path = require('path');
var del = require('del');
var clean = require('gulp-clean');

// define some compiler options https://www.npmjs.com/package/gulp-typescript
var tsOptions = {
	noImplicitAny: true,
	target: "es6",
	experimentalAsyncFunctions: true,
	noExternalResolve: true, // we provide all the file by ourselves, no <reference> is needed
	module: "commonjs" //"AMD" // "commonjs" // values ["AMD", "commonjs", "UMD", "system"]
};

var tsFiles = ["typings/main.d.ts", "typings/main/**/*.d.ts", "src/**/*.ts"];
var source = gulp.src(tsFiles);

// Compile Typescript
gulp.task("build-ts", () => {
	var tsResult = source
		.pipe(sourcemaps.init())
		.pipe(ts(tsOptions));

	tsResult.js
		.pipe(sourcemaps.write(".", {
			sourceRoot: (file) => {
				var sourceFile = path.join(file.cwd, file.sourceMap.file);
				return path.relative(path.dirname(sourceFile), file.cwd) + "/../../src";
			}
		}))
		.pipe(gulp.dest("build"));
});

// Watch
gulp.task("watch", () => {
	gulp.watch(tsFiles, ['build-ts']);
});

// Cleare Release folde
gulp.task('clean', () => {
	del.sync(["build/*"]);
});

// Run TS-Lint
gulp.task("tslint", () => {
	gulp.src(["src/**/*.ts"])
		.pipe(tslint())
		.pipe(tslint.report("verbose"));
});

// Copy views
gulp.task("copyViews", () => {
	gulp.src("./src/views/**/*.{html,htm}")
		.pipe(gulp.dest("./build/Views"));
});

// Copy public
gulp.task("copyPublic", () => {
	gulp.src("./src/Public/**/*.*")
		.pipe(gulp.dest("./build/Public"));
});

// Default task
gulp.task('default',  ["clean", "tslint", "build-ts","copyViews", "copyPublic"])