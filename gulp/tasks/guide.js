var config = require('../config');

var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

// Styleguide
var aigis = require('gulp-aigis');

// Utility
var runSequence = require('run-sequence');
var del = require('del');

////////////////////////////////////////////////
// スタイルガイドを生成
////////////////////////////////////////////////
gulp.task('aigis', function() {
  return gulp.src('./aigis/aigis_config.yml')
      .pipe(aigis());
});

////////////////////////////////////////////////
// styleguideディレクトリを削除
////////////////////////////////////////////////
gulp.task('clean-styleguide', function (cb) {
  console.log('--------- clean-styleguide task ----------');
  return del('./styleguide/' + '**/*');
});


////////////////////////////////////////////////
//スタイルガイドを生成
////////////////////////////////////////////////

gulp.task('styleguide',['clean-styleguide'], function(callback) {
  return runSequence(
      'styleguide-sass',
      'aigis',
      callback
  );
});
gulp.task('re-styleguide', function(callback) {
    return runSequence(
        'styleguide',
        'bs-reload',
        callback
    );
});

// browserSync
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './styleguide/',
      index: 'index.html'
    }
  });
});

gulp.task('bs-reload', function () {
    console.log('--------- bs-reload task ----------');
    browserSync.reload();
});


// sass
gulp.task('styleguide-sass', function () {
  console.log('--------- sass task ----------');
  gulp.src(config.sass + '**/style.scss')
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
          .pipe(gulp.dest('./dist/assets/css/'));
});

var guideTask = function (callback) {
  gulp.watch([config.sass + '**/*.scss'], ['re-styleguide']);
  callback();
};

gulp.task('guide', ['browser-sync'],guideTask);
