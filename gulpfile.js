var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');


gulp.task('tests', function() {
	return gulp
        .src('./dist/jasmine/spec/feedreader.js')
        .pipe(jasmine({
	integration: true
}));
});
gulp.task('styles',function(){
	return gulp
        .src('./src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
	browsers:['last 2 versions']
}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


gulp.task('copy-jasmine', function(){
	return gulp
        .src('./src/jasmine/spec/feedreader.js')
        .pipe(gulp.dest('./dist/jasmine/spec'));
});

gulp.task('copy-html', function(){
	return gulp
        .src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('script' , function(){
	return gulp
        .src('./src/js/**/*.js')
        .pepe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('script-dist' , function(){
	return gulp
        .src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist', gulp.series('copy-html',
		'copy-jasmine',
    'styles',
    'script-dist'
));

gulp.task('default', gulp.parallel('copy-html','copy-jasmine','styles',function(done){
	gulp.watch('./src/sass/**/*.scss',gulp.parallel('styles'));
	gulp.watch('./src/index.html', gulp.parallel('copy-html'));
  gulp.watch('./src/jasmine/spec/feedreader.js', gulp.parallel('copy-jasmine'))
	gulp.watch('./src/index.html').on('change', browserSync.reload);
	browserSync.init({
		server: './dist'
	});

	done();
}));
