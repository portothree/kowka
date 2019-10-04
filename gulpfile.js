const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

const config = require("./src/config.js");


const markup = require("./tasks/markup");
const scss = require("./tasks/scss");
const assets = require("./tasks/assets");


function watchTask() {
  browserSync.init({
    server: {
      baseDir: config.paths.prd.main
    }
  });

  watch(config.paths.markup).on("change", markup);
  watch(config.paths.scss, scss);
}

exports.default = series(parallel(markup, scss, assets), watchTask);
