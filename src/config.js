module.exports = {
  paths: {
    src: {
      main: "src/",
      assets: "src/**/assets/**"
    },
    prd: {
      main: "dist/",
      assets: "dist/assets/"
    },
    tasks: "taks/",

    markup: "src/pages/*.html",
    style: "src/common.blocks/**/*{.scss, .css}",
  }
};
