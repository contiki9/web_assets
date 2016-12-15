var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var pleeease = require('gulp-pleeease');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');

//browserSync
var browserSync = require('browser-sync');


//pug
var pug = require('gulp-pug');
var fs = require('fs');
var data = require('gulp-data');
var path = require('path');

//unity
var notify = require("gulp-notify");
var watch = require("gulp-watch");

var config = require('../config');

// sass
gulp.task('sass', function () {
    console.log('--------- sass task ----------');
    //return gulp.src(config.sass + '**/*.scss')
    return gulp.src(config.sass + '**/style.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(pleeease({
            sass: true,
            autoprefixer: true,
            minifier: true,
            mqpacker: true
        }))
        .pipe(gulp.dest(config.dist + './assets/css/'));

});

gulp.task('pug', function() {
    // JSONファイルの読み込み。
    var locals = {
        'site': JSON.parse(fs.readFileSync(config.src + '_data/' + 'site.json')),
        'data': JSON.parse(fs.readFileSync(config.src + '_data/' + 'data.json'))
    }
    return gulp.src([config.src + '**/*.pug', '!' + config.src + '**/_*.pug'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(data(function(file) {
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
        .pipe(gulp.dest(config.dist))
});




// リリースフォルダ内のファイル削除
gulp.task('clean', function () {
    console.log('--------- clean task ----------');
    return del(config.dist + '**/*');
});

//
gulp.task('output', function () {
    console.log('--------- output task ----------');
    gulp.src(
        [config.src +'assets/**','!' + config.src + '**/scss/**','!' + config.src + '**/scss',config.src +'**/*.css',config.src + '**/*.js', config.src + '**/*.{eot,oft,ttf,woff,woff2}', config.src +'**/*.{png,jpg,gif,svg}'],
        {base: 'src'}
    )
        .pipe(gulp.dest(config.dist));
});

gulp.task('copy-img', function () {
    console.log('--------- copy-img task ----------');
    gulp.src(
        [config.src + '**/*.{png,jpg,gif,svg}'],
        {base: 'src'}
    )
        .pipe(gulp.dest(config.dist))
});
gulp.task('copy-font', function () {
    console.log('--------- copy-font task ----------');
    gulp.src(
        [config.src + '**/*.{eot,oft,ttf,woff,woff2}'],
        {base: 'src'}
    )
        .pipe(gulp.dest(config.dist))
});
gulp.task('copy-js', function () {
    console.log('--------- copy-js task ----------');
    gulp.src(
        [config.src + '**/*.js'],
        {base: 'src'}
    )
        .pipe(gulp.dest(config.dist));
});

gulp.task('copy-css', function () {
    console.log('--------- copy-css task ----------');
    gulp.src(
        [config.src + '**/*.css'],
        {base: 'src'}
    )
        .pipe(gulp.dest(config.dist))
});


// browserSync
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './dist/',
            index: 'index.html'
        }
    });
});

gulp.task('bs-reload', function () {
    console.log('--------- bs-reload task ----------');
    browserSync.reload();
});



gulp.task('watch', function () {
    watch([config.src + '**/*.scss'], function(event){
        return runSequence(
            'sass',
            'bs-reload'
        );
    });
    watch([config.src + '**/*.html'], function(event){

    });
    watch([config.src + '**/*.css'], function(event){
        return runSequence(
            'copy-css',
            'bs-reload'
        );
    });
    watch([config.src + '**/*.js'], function(event){
        return runSequence(
            'copy-js',
            'bs-reload'
        );
    });
    watch([config.src + '**/images/*'], function(event){
        return runSequence(
            'copy-img',
            'bs-reload'
        );
    });
    watch([config.src + '**/*.pug'], function(event){
        return runSequence(
            'pug',
            'bs-reload'
        );
    });
});

gulp.task('default', function(callback) {
    return runSequence(
        'clean',
        ['pug', 'sass', 'output'],
        'watch',
        callback
    );
});

gulp.task('heroku', function(callback) {
    return runSequence(
        'clean',
        ['pug', 'sass', 'output'],
        callback
    );
});

gulp.task('sync', ['browser-sync','watch']);


