var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources   = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];  

var sassSources = ['components/sass/style.scss'];

gulp.task('coffee', function(done) {
    gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
         .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
    done();
});

gulp.task('js', function(done) {
   gulp.src(jsSources) 
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload())
    done();
});

gulp.task('compass', function(done) {
   gulp.src(sassSources) 
    .pipe(compass({
       sass: 'components/sass',
       image: 'builds/development/images',
       style: 'expanded'
   })
    .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload())
    done();
});


gulp.task('watch', function() {
  gulp.watch(coffeeSources, gulp.series('coffee'));
  gulp.watch(jsSources, gulp.series('js'));
  gulp.watch('components/sass/*.scss', gulp.series('compass'));
});

gulp.task('connect' , function(done) {
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
    done();
});
gulp.task('default', gulp.series('coffee', 'js', 'compass', 'connect', 'watch'))










