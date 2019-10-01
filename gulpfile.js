const fileinclude = require("gulp-file-include");
const gulp = require("gulp");

const app = {
  srcPath: "src/",
  prdPath: "dist/"
};

gulp.task("html", async () => {
  gulp
    .src(app.srcPath + "pages/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(app.prdPath));
});
