const { src, dest, series, watch } = require("gulp");
const plugins = require('gulp-load-plugins')();
const del = require('del');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

function styles(cb) {
  src('./src/**/*.less')
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer({
      cascade: false,
      remove: false,
    }))
    .pipe(dest('./dist/css/'))
    .pipe(reload({ stream: true }))
  cb()
}

function server(cb) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  cb();
}
function watcher() {
  watch('./src/**/*.less', styles);
}
exports.styles = styles;
exports.default = series([
  styles,
  server,
  watcher
])