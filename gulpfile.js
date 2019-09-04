const composer  = require('gulp-uglify/composer');
const gulp      = require("gulp");
const sass      = require("gulp-sass");
const uglifyes  = require('uglify-es');
const uglify    = composer(uglifyes, console);
const concat    = require('gulp-concat');

/* Turn SASS into CSS */
gulp.task('css', function() {
	return gulp.src('./_src/assets/scss/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		})
		.on('error', sass.logError))
		.pipe(gulp.dest('./src/assets/css'));
});

/*
 Uglify our javascript files into one.
 Use pump to expose errors more usefully.
*/
gulp.task('js', function() {
  return gulp.src("./_src/assets/scripts/**/*.js")
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/assets/js'));
});

/* Watch folders for changess */
gulp.task("watch", function() {
  gulp.watch('./_src/assets/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./_src/assets/scripts/**/*.js', gulp.parallel('js'));
});

/* Let's build this sucker. */
gulp.task('build', gulp.parallel('css', 'js'));