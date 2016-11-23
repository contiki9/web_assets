var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var pleeease = require('gulp-pleeease');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');

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

//jade
gulp.task("jade", function () {
    gulp.src([config.src + '**/*.jade', '!' + config.src + '**/_*.jade'])
        .pipe(plumber())
        .pipe(jade({
            pretty: true,
            compile: {
                options: {
                    //pretty: true,
                    data: {
                        // コンパイル時に渡しておきたいオブジェクト
                    },
                    basedir: '<%= path.src %>/jade'
                },
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>/jade',
                    src: '**/!(_)*.jade',
                    dest: '<%= path.dist %>',
                    ext: '.html'
                }]
            }
        }))
        .pipe(gulp.dest(config.dist));
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


gulp.task('watch', function () {
    gulp.watch([config.src + '**/*.scss'],['sass']);
    gulp.watch([config.src + '**/*.html']);
    gulp.watch([config.src + '**/*.css'],['copy-css']);
    gulp.watch([config.src + '**/*.js'],['copy-js']);
    gulp.watch([config.src + '**/images/*'],['copy-img']);
    gulp.watch([config.src + '**/*.jade'], ['jade']);
});


gulp.task('default', function(callback) {
    return runSequence(
        'clean',
        ['jade', 'sass', 'output'],
        'watch',
        callback
    );
});


