const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const smartgrid = require('smart-grid');
var pipeline = require('readable-stream').pipeline;
const uncss = require('gulp-uncss');
const webp = require('gulp-webp');
var csso = require('gulp-csso');
let uglify = require('gulp-uglify-es').default;
var imagetransform = require('./imagetransform.js');
var convertEncoding = require('gulp-convert-encoding');
const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);
var rename = require("gulp-rename");
var htmlmin = require('gulp-html-minifier');
imagemin     = require('gulp-imagemin'),
imgCompress  = require('imagemin-jpeg-recompress');

const debug = require ( 'gulp-debug') ;
var cache = require('gulp-cache');
const gulpAvif = require('gulp-avif');
/*
	1. browserSync для html
	2.
		gulp-uncss - удаление неиспользуемого css
		gulp-group-css-media-queries - соединение media-запрос
	3. по желанию pug html препроц
*/

/*
let cssFiles = [
	'./node_modules/normalize.css/normalize.css',
	'./src/css/base.css',
	'./src/css/grid.css',
	'./src/css/humans.css'
];
*/

function clear(){
	return del('build/*');
}

function styles(){
	return gulp.src('./src/css/+(styles|styles-per|styles-ie9).less','/src/css/**/*.min.css')
			 //  .pipe(gulpif(isDev, sourcemaps.init()))
			   .pipe(less())
			   .pipe(concat('style.css'))
			   .pipe(gcmq())
			   .pipe(autoprefixer({
		            browsers: ['> 0.1%'],
		            cascade: false
		        }))
			   //.on('error', console.error.bind(console))
			   .pipe(gulpif(isProd, cleanCSS({
			   		level: 2
			   })))
			  // .pipe(gulpif(isDev, sourcemaps.write()))
				 .pipe(csso())
			   .pipe(gulp.dest('./build/assets/css'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}
function css(){
	return gulp.src('./src/css/swiper.min.css')
	.pipe(gulp.dest('./build/assets/css'));
}
function video(){
	return gulp.src('./src/video/**/*.mp4', './src/video/**/*.webm')
	.pipe(gulp.dest('./build/assets/video'));
}
function font(){
	return gulp.src('./src/font/**/*')
	.pipe(gulp.dest('./build/assets/font'));
}
function img(){
	return gulp.src('./src/img/**/*')
					.pipe(rename(function (path) {
				//	path.basename = path.basename.replace(' ', '').replace('-', '').replace('_', '');
					}))
					.pipe(imagemin([
					imgCompress({
					  loops: 4,
					  min: 70,
					  max: 80,
					  quality: 'high'
					}),
					imagemin.gifsicle(),
					imagemin.optipng(),
					imagemin.svgo()
				  ]))
					.pipe(debug({title: 'building img:', showFiles: true}))
					.pipe(gulp.dest('./build/assets/img'))
}
function imgAfiv(){
	return gulp.src('./src/img/*.{png,jpg}')
					.pipe(rename(function (path) {
				//	path.basename = path.basename.replace(' ', '').replace('-', '').replace('_', '');
					}))
					.pipe(debug({title: 'building img:', showFiles: true}))
					.pipe(gulpAvif())
					.pipe(gulp.dest('./build/assets/img'))
}
function imgWebp(){
	return gulp.src('./src/img/**/*')
					.pipe(rename(function (path) {
				//	path.basename = path.basename.replace(' ', '').replace('-', '').replace('_', '');
					}))
					.pipe(debug({title: 'building img:', showFiles: true}))
					.pipe(webp())
					.pipe(gulp.dest('./build/assets/img'))
}
function js(){
	return gulp.src('./src/js/**/*.js')
				.pipe(uglify())
				.pipe(gulp.dest('./build/assets/js'))
}

function html(){
	return gulp.src('./src/*.html')
				.pipe(convertEncoding({to: 'utf8'}))
			 // .pipe(imagetransform())
				.pipe(htmlmin({collapseWhitespace: true}))
		    .pipe(gulp.dest('./build'))
		    .pipe(gulpif(isSync, browserSync.stream()));
}
function php(){
	return gulp.src('./src/**/*.php')
		    .pipe(gulp.dest('./build'))
		    .pipe(gulpif(isSync, browserSync.stream()));
}
function json(){
	return gulp.src('./src/**/*.json')
		    .pipe(gulp.dest('./build'))
		    .pipe(gulpif(isSync, browserSync.stream()));
}
function watch(){
	if(isSync){
		browserSync.init({
	        server: {
	            baseDir: "./build/",
	        }
	    });
	}

	gulp.watch('./src/video/*', video);
	gulp.watch('./src/css/**/*.css', css);
	gulp.watch('./src/css/**/*.less', styles);
	gulp.watch('./src/js/**/*.js', js);
	gulp.watch('./src/img/**/*', img);
	gulp.watch('./src/img/**/*',imgWebp);
	gulp.watch('./src/img/**/*',imgAfiv);
	gulp.watch('./src/font/*', font);
	gulp.watch('./src/**/*.html', html);
	gulp.watch('./src/**/*.php', php);
	gulp.watch('./src/**/*.json', json);
	gulp.watch('./smartgrid.js', grid);
}

function grid(done){
	delete require.cache[require.resolve('./smartgrid.js')];

	let settings = require('./smartgrid.js');
	smartgrid('./src/css', settings);

	settings.offset = '3.1%';
	settings.filename = 'smart-grid-per';
	smartgrid('./src/css', settings);

	done();
}

let build = gulp.series(clear,
	gulp.parallel(styles, img, js, html, font, css, video, php, json, imgAfiv, imgWebp)
//	gulp.parallel(styles, img, js, html, font, css, video, php, json, )
);

gulp.task('build', gulp.series(grid, build));
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', grid);
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});
