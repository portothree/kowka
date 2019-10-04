const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

const config = require("../src/config.js");


module.exports = function scss() {
  return src(config.paths.scss)
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(dest(config.paths.prd.main + "css"))
    .pipe(browserSync.stream());
};
