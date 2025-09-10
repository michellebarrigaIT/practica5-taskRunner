const { series } = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');

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

exports.serve = serve;
exports.reload = reload;
exports.default = serve;
