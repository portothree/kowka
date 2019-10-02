const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

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
    .pipe(gulp.dest(app.prdPath))
    .pipe(browserSync.stream());
});

gulp.task("sass", () => {
  return gulp
    .src("src/common.blocks/*.scss")
    .pipe(sass())
    .pipe(gulp.dest(app.prdPath + "/css"))
    .pipe(browserSync.stream());
});

// make sure that the tasks are completed before reloading
gulp.task("html-watch", ["html"], browserSync.reload);
gulp.task("sass-include", ["sass"], browserSync.reload);

gulp.task("default", ["html", "sass"], () => {
  browserSync.init({
    server: {
      baseDir: app.prdPath
    }
  });

  gulp.watch("src/pages/*.html", ["html-watch"]);
  gulp.watch("src/common.blocks/*.scss", ["sass-include"]);
});
