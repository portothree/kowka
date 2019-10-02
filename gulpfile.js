const gulp = require("gulp");
const fileinclude = require("gulp-file-include");

const app = {
  srcPath: "src/",
  prdPath: "dist/"
};

async function html() {
  gulp
    .src(app.srcPath + "pages/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(app.prdPath))
};

exports.html = html;