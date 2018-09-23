module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src([$.style + "[^_]*.{sass,scss}", "!src/sass/_sprite.sass"])
      .pipe(
        $.plumber({
          errorHandler: $.notify.onError(function(error) {
            return {
              title: "Styles",
              message: error.message
            };
          })
        })
      )
      .pipe($.gulpIf($.dev, $.sourcemaps.init()))
      .pipe(
        $.sass({
          outputStyle: $.dev ? "expanded" : "compact", // nested, expanded, compact, compressed
          precision: 5,
          includePaths: $.normalize
        })
      )
      .pipe($.rewriteCSS({
        destination: './dist/'
      }))
      .pipe($.postcss([
        $.autoprefixer({
          browsers: ['ie >= 8', 'last 10 version'],
          cascade: false
        })
      ]))
      .pipe($.gulpIf(!$.dev, $.postcss([
        $.csso
      ])))
      .pipe($.gulpIf(!$.dev, $.rename({
        suffix: ".min"
      })))
      .pipe($.gulpIf($.dev, $.sourcemaps.write("./")))
      .pipe($.gulp.dest($.assets + 'css/'))
      .pipe( $.browserSync.reload({ stream: true }));
  })
}