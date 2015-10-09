var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var typescript = require("typescript");
var tslint = require("gulp-tslint");
var path = require('path');

// gulp-sourcemaps work well for a browser, it does not with vscode, for that to work use the plain command line compiler to emit source maps. 

// define some compiler options
var tsOptions = {
  //typescript: typescript, // use the local copy of the compiler
  noImplicitAny: true,
  target: "ES5",
  //out: "application.js", concat everything in a single application
  //suppressExcessPropertyErrors: true, // typescript 1.6 breaking change!
  experimentalAsyncFunctions: true,
  noExternalResolve: true, // we provide all the file by ourselves, no <reference> is needed
  module: "commonjs" //"AMD" // "commonjs" // values ["AMD", "commonjs", "UMD", "system"]
};

var tsFiles = ["typings/**/*.d.ts", "src/**/*.ts"];
var source = gulp.src(tsFiles);

gulp.task("tslint", function() {
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
    //.pipe(sourcemaps.write(".", {includeContent: true})) // sourcemaps will be generated on an external file
    //.pipe(sourcemaps.write()) // sourcemap added to the source file (does not work either works with vscode debugger)
    .pipe(sourcemaps.write(".", { // allow VSCode debugger to work: https://github.com/ivogabe/gulp-typescript/issues/201
      // Return relative source map root directories per file.
      sourceRoot: function (file) {
        var sourceFile = path.join(file.cwd, file.sourceMap.file);
        return path.relative(path.dirname(sourceFile), file.cwd) + "/../../src";  // will probide the right location of the source files relative to the build folder
      }
    }))
    
    /*
    .pipe(sourcemaps.write({ // allow VSCode debugger to work: https://github.com/ivogabe/gulp-typescript/issues/201
      // Return relative source map root directories per file.
      sourceRoot: function (file) {
        var sourceFile = path.join(file.cwd, file.sourceMap.file);
        return path.relative(path.dirname(sourceFile), file.cwd); // + "/../src";  // will probide the right location of the source files relative to the build folder
      }
    }))
    */
    .pipe(gulp.dest("build/Release"));
});

gulp.task("watch", function() {
  gulp.watch(tsFiles, ['build-ts']);  
});
