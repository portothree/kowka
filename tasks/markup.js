const { src, dest } = require("gulp");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();

const config = require("../src/config.js");

module.exports = function markup() {
  return src(config.paths.markup)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(dest(config.paths.prd.main))
    .pipe(browserSync.stream());
};
