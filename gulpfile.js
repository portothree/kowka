const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();

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

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: app.prdPath
    }
  });
});
