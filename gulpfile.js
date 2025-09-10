const { src, dest, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

function styles() {
  return src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

function serve(done) {
  const baseDir = fs.existsSync('dist') ? 'dist' : '.';

  browserSync.init({
    server: { baseDir },
    open: true,
    notify: false,
  });

  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

exports.styles = styles;
exports.serve = serve;
exports.reload = reload;
exports.default = series(styles, serve);
