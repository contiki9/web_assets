var path = require('path');
var root = path.resolve(__dirname + '/..');

module.exports = {
	root: root,
	src: root + '/src/',
	sass: root + '/src/assets/scss/',
	src_js: root + '/src/js/',
	src_img: root + '/src/images/',
	dist: root + '/dist/',
	sassOptions: {
		includePaths: ['node_modules/'],
		outputStyle: 'compressed'
	}
};
