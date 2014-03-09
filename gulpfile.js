/* jshint node: true */
var gulp = require('gulp');

var g = require('gulp-load-plugins')();

var scriptFiles = './src/**/*.js';

gulp.task('buildJs', function() {
  gulp.src('./src/main.js')
    .pipe(g.browserify({
      shim: {
        coquette: {
          path: 'node_modules/coquette/coquette.js',
          exports: 'Coquette'
        }
      },
      transform: [require('browserify-es6-modules')],
    }))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('connect', g.connect.server({
  port: process.env.PORT || 8000,
  hostname: '0.0.0.0',
  root: __dirname
}));

gulp.task('watch', function() {
  gulp.watch(scriptFiles, ['buildJs']);
});

gulp.task('default', ['buildJs']);
gulp.task('dev', ['buildJs', 'connect', 'watch']);
