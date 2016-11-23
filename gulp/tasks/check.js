var gulp = require('gulp');
var htmlhint = require("gulp-htmlhint");
var csslint = require('gulp-csslint');

var config = require('../config');

//HTMLの文法チェック
gulp.task('check-html', function() {
    console.log('--------- check-html task ----------');
	gulp.src('src/**/*.html')
		.pipe(htmlhint())
		.pipe(htmlhint.reporter());
});


//CSSの文法をチェック
gulp.task('check-css', function() {
    console.log('--------- check-css task ----------');
  gulp.src('src/**/*.css')
    		.pipe(csslint({
			"adjoining-classes": false,
			"box-model": false,
			"box-sizing": false,
			"bulletproof-font-face": false,
			"compatible-vendor-prefixes": false,
			"empty-rules": false,
			"display-property-grouping": false,
			"duplicate-background-images": false,
			"duplicate-properties": false,
			"fallback-colors": false,
			"floats": false,
			"font-faces": false,
			"font-sizes": false,
			"gradients": false,
			"ids": false,
			"import": false,
			"important": false,
			"known-properties": false,
			"outline-none": false,
			"overqualified-elements": false,
			"qualified-headings": false,
			"regex-selectors": false,
			"shorthand": false,
			"star-property-hack": false,
			"text-indent": false,
			"underscore-property-hack": false,
			"unique-headings": false,
			"universal-selector": false,
			"unqualified-attributes": false,
			"vendor-prefix": false,
			"zero-units": false
		}))
    .pipe(csslint.reporter());
});


//総合チェック
gulp.task('check', ['check-css', 'check-html']);