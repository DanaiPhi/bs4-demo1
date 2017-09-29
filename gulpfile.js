var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers

gulp.task('sass', function() {
   return gulp.src(['assets/scss/*.scss'])
       .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
       .pipe(gulp.dest("assets/css"))
       .pipe(browserSync.stream());
});

// Move the javascript files into our /assets/js folder

gulp.task('js', function() {
   return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
       .pipe(gulp.dest("assets/js"))
       .pipe(browserSync.stream());
});

// Static Server + watching scss/html files

gulp.task('serve', ['sass'], function() {
   browserSync.init({
       server: "./" 
   });

   gulp.watch(['assets/scss/*.scss'], ['sass']);
   gulp.watch(['assets/css/*.css'], ['minify-css']);
   gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);