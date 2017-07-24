// task configurations
var config = require('./gulp.config')();

// task package dependencies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    include = require("gulp-include");

/**
 * SCSS -> CSS compilation
 *
 * compiles scss syntax to css
 * autoprefixes the content
 */
gulp.task('scss', function () {
    return gulp
        .src(config.scss.base)
        .pipe(sass(config.options.scss).on('error', sass.logError))
        .pipe(autoprefixer(config.options.autoprefixer))
        .pipe(gulp.dest(config.scss.output));
});

/**
 * SCSS -> CSS compilation
 *
 * compiles and uglifies js
 */
gulp.task('js', function(){
    return gulp
        .src(config.js.base)
        .pipe(include({
            extensions: "js",
            hardFail: true,
            includePaths: [
                __dirname + "/node_modules",
                __dirname + "/src/js"
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.output));
});

/**
 * WATCH task - run 'gulp watch'
 *
 * @task scss
 * @task js
 *
 * watches input raw files for updates and auto runs the appropriate tasks
 */
gulp.task('watch', ['js', 'scss'], function(){
  gulp.watch([config.scss.input], ['scss']);
  gulp.watch([config.js.input], ['js']);
});


/**
 * DEFAULT task - run 'gulp'
 *
 * @task scss
 * @task js
 */
gulp.task('default', ['scss', 'js']);
