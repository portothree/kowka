const { src, dest } = require("gulp");
const flatten = require("gulp-flatten");
const browserSync = require("browser-sync").create();

const config = require("../src/config.js");

module.exports = function assets() {
  return src(config.paths.src.assets)
    .pipe(flatten())
    .pipe(dest(config.paths.prd.assets))
    .pipe(browserSync.stream());
};
