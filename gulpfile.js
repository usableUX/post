var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump')

gulp.task('dom-scripts', function() {
    return gulp.src('js/dom.js')
      .pipe(uglify())
      .pipe(concat('dom.min.js'))
      .pipe(gulp.dest('js/'));
});

gulp.task('app-scripts', function() {
    return gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('js/'));
});

gulp.task('watch', function() {
  gulp.watch('js/dom.js', ['dom-scripts']);
  gulp.watch('js/app.js', ['app-scripts']);
});

gulp.task('default', ['watch', 'dom-scripts', 'app-scripts']);
