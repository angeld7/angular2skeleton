var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
const del = require('del');

var appDev = 'dev/';
var pub = 'public/'
var appTmp = pub + 'app/';
var appTest = 'test/';
var testTmp = pub + "test/";

var assetsDev = 'assets/';
var assetsTmp = pub + 'assets/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json');

// clean the contents of the distribution directory
// gulp.task('clean', function () {
//     return del(pub + '**/*');
// });

gulp.task('copy:vendor', function () {
    return gulp.src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/angular2/bundles/http.js'
        ])
        .pipe(gulp.dest(pub + 'vendor'));
});

gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(assetsTmp + 'css/'));
});

gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(jsuglify())
        .pipe(gulp.dest(pub));
});

gulp.task('build-img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsTmp + 'img/'));
});

gulp.task('build-html', function () {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(pub));
});

gulp.task('test', function () {
    return gulp.src([appTest + '/js/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', util.log);
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appDev + '**/*.html', ['build-html']);
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
});

gulp.task('default', ['copy:vendor', 'watch', 'build-ts', 'build-css', 'build-html']);

gulp.task('watch-test', ['build-test-ts', 'test'], function () {
    gulp.watch([pub + '**/*.js'], ['test']);
});
