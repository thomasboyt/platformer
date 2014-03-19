/* jshint node: true */
var gulp = require('gulp');

var g = require('gulp-load-plugins')();

var scriptFiles = './src/**/*.js';

function es6moduleify(file) {
  return require('browserify-es6-modules')(file, {
    namespace: 'app'
  });
}

gulp.task('buildJs', function() {
  gulp.src('./src/init.js')
    .pipe(g.browserify({
      shim: {
        coquette: {
          path: 'node_modules/coquette/coquette.js',
          exports: 'Coquette'
        }
      },
      transform: [es6moduleify],
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
