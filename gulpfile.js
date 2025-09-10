const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');

const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

const htmlReplace = require('gulp-html-replace');

function styles() {
  return src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
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
    .pipe(dest('dist/img'));
}

function html() {
  return src('index.html')
    .pipe(htmlReplace({
      'css': 'css/styles.css',
      'js': 'js/app.js'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch('scss/**/*.scss', styles);
  watch('js/**/*.js', scripts);
  watch('img/**/*', images);
  watch('index.html', html);
}


function serve(done) {
  const baseDir = fs.existsSync('dist') ? 'dist' : '.';

  browserSync.init({
    server: { baseDir },
    open: true,
    notify: false,
  });
  
  watchFiles();
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
exports.default = series(styles, scripts, images, html, serve);
