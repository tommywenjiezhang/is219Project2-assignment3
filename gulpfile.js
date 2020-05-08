const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const nodemon = require('nodemon');
const isProd = process.env.NODE_ENV === 'prod';



function nodeMonServe() {
    nodemon({
        script: 'src/server.js',
        ext: 'js',
        env: {
            NODE_ENV: 'dev',
            PORT: 9080
        },
        ignore: ['./node_modules/**']
    });
}

exports.serve = gulp.task(nodeMonServe);
exports.default = gulp.task(nodeMonServe);