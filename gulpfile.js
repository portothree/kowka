const fileinclude = require("gulp-file-include");
const gulp = require("gulp");

const app = {
  srcPath: "src/"
};

gulp.task("fileinclude", async () => {
  gulp
    .src(app.srcPath + "pages/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest("./dist"));
});
