const { src, dest } = require("gulp");
const browserSync = require("browser-sync").create();

const config = require("../src/config.js");

module.exports = function assets() {
  return src(config.paths.src.assets)
    .pipe(dest(config.paths.prd.assets))
    .pipe(browserSync.stream());
};
