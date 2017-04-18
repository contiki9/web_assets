var gulp = require('gulp');

//scss
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');

//pug
var pug = require('gulp-pug');
var fs = require('fs');
var data = require('gulp-data');
var path = require('path');


//画像圧縮
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

//JS圧縮
var uglify = require('gulp-uglify');

//browserSync
var browserSync = require('browser-sync');

// Styleguide
var aigis = require('gulp-aigis');

// Utility
var notify = require("gulp-notify");
var watch = require("gulp-watch");
var runSequence = require('run-sequence');
var del = require('del');


////////////
// config
///////////

//開発用ディレクトリ
var develop = {
    'root': './src/',
    'assets': './src/assets/'
};

//コンパイル先
var release = {
    'root': './dist/',
    'css': './dist/css/'
};

// Defining base pathes
var paths = {
    node: './node_modules/',
    guide: './aigis/'
};

// browser-sync watched files
// automatically reloads the page when files changed
var browserSyncWatchFiles = [
    develop.root + './**/*.pug',
    develop.assets + '**/scss/*.scss',
    release.root + '**/css/*.css',
    release.root + '**/js/*.js',
    release.root + '**/*.php',
    release.root + '**/*.html'
];


// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    //proxy: "localhost/wordpress/",
    notify: false,
    server: {
        baseDir: release.root,
        index: 'index.html'
    }
};

var AUTOPREFIXER_BROWSERS = [
    // @see https://github.com/ai/browserslist#browsers
    // Major Browsers（主要なブラウザの指定）
    'last 2 version', // （Major Browsersの）最新2バージョン
    // 'Chrome >= 34', // Google Chrome34以上
    // 'Firefox >= 30', // Firefox30以上
    'ie >= 9', // IE9以上
    // 'Edge >= 12', // Edge12以上
    'iOS >= 7', // iOS7以上
    // 'Opera >= 23', // Opera23以上
    // 'Safari >= 7', // Safari7以上

    // Other（Androidなどのマイナーなデバイスの指定）
    'Android >= 4.0' // Android4.0以上
];

//////////////////
// gulp setting
//////////////////

// sass
gulp.task('sass', function () {
    console.log('--------- sass task ----------');
    return gulp.src(develop.assets + 'scss/**/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(pleeease({
            autoprefixer: {"browsers": AUTOPREFIXER_BROWSERS},
            minifier: false,
        }))
        .pipe(gulp.dest(release.css));
});


gulp.task('pug', function () {
    // JSONファイルの読み込み。
    var locals = {
        'site': JSON.parse(fs.readFileSync(develop.root + '_data/' + 'site.json')),
        'data': JSON.parse(fs.readFileSync(develop.root + '_data/' + 'data.json'))
    }
    return gulp.src([develop.root + '**/*.pug', '!' + develop.root + '**/_*.pug'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(data(function (file) {
            // 各ページごとの`/`を除いたルート相対パスを取得します。
            locals.relativePath = path.relative(file.base, file.path.replace(/.pug$/, '.html'));
            return locals;
        }))
        .pipe(pug({
            // JSONファイルをPugに渡します。
            locals: locals,
            // Pugファイルのルートディレクトリを指定します。
            // `/assets/pug/_layout`のようにルート相対パスを使います。
            basedir: 'src',
            // Pugファイルの整形。
            pretty: true
        }))
        .pipe(gulp.dest(release.root))
});


//画像を圧縮
gulp.task('image-min', function () {
    console.log('--------- image-min task ----------');
    return gulp.src(develop.assets + 'images/**/*.+(jpg|jpeg|png|gif|svg)')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            use: [pngquant({quality: '65-80', speed: 1})]
        }))
        .pipe(gulp.dest(release.root));
});

// jsを圧縮
gulp.task('uglify', function () {
    console.log('--------- uglify task ----------');
    return gulp.src(develop.assets + '**/*.js')
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest(release.root));
});

//開発環境のコンパイル
gulp.task('copy', function () {
    console.log('--------- output task ----------');
    gulp.src(
        [develop.root + '**', '!' + develop.assets + '**/scss/**', '!' + develop.assets + '**/scss/', develop.assets + '**/*.css', develop.assets + '**/js/*.js', develop.assets + '**/fonts/*.{eot,oft,ttf,woff,woff2}', develop.assets + '**/images/*.{png,jpg,gif,svg}'],
        {base: develop.root}
    )
        .pipe(gulp.dest(release.root));
});


// browserSync
gulp.task('browser-sync', function () {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

gulp.task('bs-reload', function () {
    console.log('--------- bs-reload task ----------');
    browserSync.reload();
});


////////////////////////////////////////////////
// スタイルガイドを生成
////////////////////////////////////////////////
gulp.task('aigis', function () {
    return gulp.src(paths.guide + 'aigis_config.yml')
        .pipe(aigis());
});

////////////////////////////////////////////////
// スタイルガイドディレクトリを削除
////////////////////////////////////////////////
gulp.task('clean-styleguide', function () {
    console.log('--------- clean-styleguide task ----------');
    return del(paths.guide + '**/*');
});


////////////////////////////////////////////////
//スタイルガイドを生成
////////////////////////////////////////////////

gulp.task('styleguide', ['clean-styleguide'], function (callback) {
    return runSequence(
        'sass',
        'aigis',
        callback
    );
});
gulp.task('re-styleguide', function (callback) {
    return runSequence(
        'styleguide',
        'bs-reload',
        callback
    );
});

///////////////////////////////////////////////
//その他
////////////////////////////////////////////////
gulp.task('re-sass', function (callback) {
    return runSequence(
        'sass',
        'bs-reload',
        callback
    );
});
gulp.task('re-pug', function (callback) {
    return runSequence(
        'pug',
        'bs-reload',
        callback
    );
});


// リリースフォルダ内のファイル削除
gulp.task('clean', function () {
    console.log('--------- clean task ----------');
    return del(config.dist + '**/*');
});
gulp.task('output', function (callback) {
    return runSequence(
        'copy',
        ['sass', 'image-min', 'uglify'],
        'bs-reload',
        callback
    );
});


// gulpのデフォルト
gulp.task('default', ['output'], function () {
    gulp.watch(develop.root + '**/*.pug', ['re-pug']);
    gulp.watch(develop.assets + 'scss/**/*.scss', ['re-sass']);
    gulp.watch(develop.assets + 'images/**/*', ['image-min']);
    gulp.watch(develop.assets + 'js/**/*', ['uglify']);
    gulp.watch('./**/*.html', ['bs-reload']);
    gulp.watch('./**/*.php', ['bs-reload']);
});
// gulpのデフォルト
gulp.task('sync', ['browser-sync'], function () {
    gulp.watch(develop.root + '**/*.pug', ['re-pug']);
    gulp.watch(develop.assets + 'scss/**/*.scss', ['re-sass']);
    gulp.watch('./**/*.html', ['bs-reload']);
    gulp.watch('./**/*.php', ['bs-reload']);
});