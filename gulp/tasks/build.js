var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var minifyHTML = require('gulp-minify-html');
var runSequence = require('run-sequence');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');

var config = require('../config');

//HTMLを圧縮
gulp.task('minify-html', function () {
  console.log('--------- minify-html task ----------');
  return gulp.src('dist/*.html')
          .pipe(minifyHTML({empty: true}))
          .pipe(gulp.dest('dist'));
});

//画像を圧縮
gulp.task('image', function () {
  console.log('--------- image task ----------');
  return gulp.src('dist/**/images/*.+(jpg|jpeg|png|gif|svg)')
          .pipe($.imagemin({
            interlaced: true,
            progressive: true,
            use: [pngquant({quality: '65-80', speed: 1})]
          }))
          .pipe(gulp.dest('dist'));
});

// cssを圧縮
gulp.task('cssmin', function () {
  console.log('--------- CSSmin task ----------');
  gulp.src('dist/**/*.css')
          .pipe(cssmin())
          .pipe(gulp.dest('dist'));
});

// jsを圧縮
gulp.task('uglify', function () {
  console.log('--------- uglify task ----------');
      return gulp.src('./dist/**/*.js')
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest('dist'));
});


// コピー（リリースフォルダ内を削除してコピー）
gulp.task('copy', ['clean'], function () {
  console.log('--------- copy task ----------');
  return gulp.src(
          ['src/**/*.html', 'src/**/css/*.css', 'src/**/js/*.js', 'src/**/images/**'],
          {base: 'src'}
  )
          .pipe(gulp.dest('dist'));
});


// リリースファイルのビルド
gulp.task('build', function (cb) {
  runSequence('copy', ['minify-html', 'image', 'cssmin','uglify'], cb);
});
