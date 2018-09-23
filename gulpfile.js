'use strict'

global.$ = {

  dev: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  fs: require('fs'),
  File: require('vinyl'),
  testFolder: './dist/assets/js/',

  // path - start
  html: './src/template/',
  style: './src/sass/',
  js: './src/js/',
  img: './src/img/',
  fonts: './src/fonts/',
  sprite: './src/img/sprite-source/',
  dist: './dist/',
  assets: './dist/assets/',
  destHtml: './dist/*.html',
  destJs: './dist/assets/js/*.js',
  destCss: './dist/assets/css/*.css',
  // path - end

  // packages - start
  gulp: require('gulp'),
  browserSync: require('browser-sync').create(),
  del: require('del'),

  // html
  prettify: require('gulp-html-prettify'),
  njkRender: require('gulp-nunjucks-render'),
  htmlmin: require('gulp-htmlmin'),
  pug: require('gulp-pug'),
  htmlclean: require('gulp-htmlclean'),

  // css
  sass: require("gulp-sass"),
  postcss: require("gulp-postcss"),
  autoprefixer: require("autoprefixer"),
  csso: require("postcss-csso"),
  normalize: require("node-normalize-scss").includePaths,
  rewriteCSS: require('gulp-rewrite-css'),  // замена путей для изображений

  // =====================================
  gulpIf: require('gulp-if'),
  sourcemaps: require("gulp-sourcemaps"),  
  plumber: require("gulp-plumber"),
  notify: require("gulp-notify"),
  rename: require("gulp-rename"),
  inject: require('gulp-inject'),
  through2: require("through2").obj,
  //====================================== 

  // img
  imagemin: require('gulp-imagemin'),


  // js
  webpack: require("webpack"),
  gulpWebpack: require("webpack-stream"),
  webpackConfig: require("./webpack.config"),
  // packages - end

  // not installed packages - start
  svgSprite: require("gulp-svg-sprite"),
  svgmin: require("gulp-svgmin"),
  replace: require("gulp-replace"),
  cheerio: require("gulp-cheerio"),
  merge: require("merge-stream"),
  spritesmith: require("gulp.spritesmith"),
  // not installed packages - end

  // path for tasks - start
  tasks: require('./gulp/config/tasks'),
  // path for tasks - end

  // helpers - start
  replacePath(file, enc, cb) {
    // relative or absolute paths
    let pathReg = /((\.\/)?(\.\.\/)(\.\.\/)?)|(\/src\/)/g;
    const pathDest = './assets/';
    const bufferPage = file.contents;
    const stringPage = bufferPage.toString('utf8');
    const replacedPage = stringPage.replace(pathReg, pathDest);
    file.contents = Buffer.from(replacedPage);
    cb(null, file);
  },
  // helpers - end

}


console.log( ($.dev) ? 'DEVELOPMENT' : 'PRODUCTION' );

$.tasks.forEach((taskPath) => {
  require(taskPath)();
});


$.gulp.task('build',
  $.gulp.series(
    "clean",
    "svg:sprite",
    $.gulp.parallel("fonts", "img", "html", "sass", "webpack"),
    "inject",
  )
);


$.gulp.task('default',
  $.gulp.series(
    "clean",
    "svg:sprite",
    $.gulp.parallel("fonts", "img", "html", "sass", "webpack"),
    "inject",
    $.gulp.parallel("watch", "serve")
  )
);
