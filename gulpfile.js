const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

const config = require("./src/config.js");


const markup = require("./tasks/markup");
const style = require("./tasks/style");
const assets = require("./tasks/assets");


function watchTask() {
  browserSync.init({
    server: {
      baseDir: config.paths.prd.main
    }
  });

  watch(config.paths.markup).on("change", markup);
  watch(config.paths.style, style);
  watch(config.paths.src.assets, assets);
}

exports.default = series(parallel(markup, style, assets), watchTask);
