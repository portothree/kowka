const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

const config = require("../src/config.js");


module.exports = function style() {
  return src(config.paths.style)
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(dest(config.paths.prd.main + "css"))
    .pipe(browserSync.stream());
};
