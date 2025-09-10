const { src, dest, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

function styles() {
  return src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(dest('dist/js')) 
    .pipe(browserSync.stream());
}

function images() {
  return src('img/**/*') 
    .pipe(imagemin())
    .pipe(dest('dist/img'))
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
exports.scripts = scripts;
exports.images = images;
exports.serve = serve;
exports.reload = reload;
exports.default = series(styles, scripts, images, serve);
