const gulp = require('gulp');
const path = require('path');
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const conf = require('./conf');

// define some compiler options https://www.npmjs.com/package/gulp-typescript
let tsOptions = {
    noImplicitAny: true,
    target: "es6",
    experimentalDecorators: true,
    sourceMap: true,
    removeComments: true,
    declaration: false, // generate typescript definitions
    module: "commonjs" // possible values ["AMD", "commonjs", "UMD", "system"]
};

let srcPath = path.join(conf.paths.src, '/node/**/*.ts');

let tsFiles = ["typings/main.d.ts",
    "typings/main/**/*.d.ts",
    srcPath
];
let source = gulp.src(tsFiles);

// Compile Typescript
gulp.task("typescript:dist", () => {
    let tsResult = source
        .pipe(sourcemaps.init())
        .pipe(ts(tsOptions));

    let result = tsResult.js
        .pipe(sourcemaps.write(".", {
            sourceRoot: (file) => {
                let sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd) + "/../../src";
            }
        }))
        .pipe(gulp.dest(conf.paths.dist));

    return tsResult;
});

// Compile Typescript
gulp.task("typescript:serve", () => {

    let tsResult = source
        .pipe(sourcemaps.init())
        .pipe(ts(tsOptions));

    let result = tsResult.js
        .pipe(sourcemaps.write(".", {
            sourceRoot: (file) => {
                let sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd) + "/../../src";
            }
        }))
        .pipe(gulp.dest(path.join(conf.paths.tmp, "/node")));

    return tsResult;

});
