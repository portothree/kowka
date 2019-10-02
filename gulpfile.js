const { src, dest, watch, series, parallel } = require("gulp");
const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

const app = {
  srcPath: "src/",
  prdPath: "dist/",

  scssPath: "src/common.blocks/**/*.scss",
  htmlPath: "src/pages/*.html"
};

function html(done) {
  src(app.htmlPath)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(dest(app.prdPath))
    .pipe(browserSync.stream());

  done();
}

function style(done) {
  src(app.scssPath)
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(dest(app.prdPath + "css"))
    .pipe(browserSync.stream());

  done();
}

function watchTask() {
  browserSync.init({
    server: {
      baseDir: app.prdPath
    }
  });

  watch(app.htmlPath).on("change", html);
  watch(app.scssPath, style);
}

exports.default = series(parallel(html, style), watchTask);
