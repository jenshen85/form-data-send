module.exports = function() {

  $.gulp.task('pug:view', function() {
    return $.gulp.src(
     [$.html + '**/*.pug', '!./src/template/view/']
    )
      .pipe($.plumber({
        errorHandler: $.notify.onError(function(error) {
          return {
            title: "pug:view",
            message: error.message
          };
        })
      }))
      .pipe($.through2(function(file, enc, cb) {
        $.replacePath(file, enc, cb)
      }))
      .pipe($.gulp.dest('src/template/view/'))
  })

  $.gulp.task('html:view', function() {
    return $.gulp.src(
     [$.html + '**/*.html', '!./src/template/view/']
    )
      .pipe($.plumber({
        errorHandler: $.notify.onError(function(error) {
          return {
            title: "html:view",
            message: error.message
          };
        })
      }))
      .pipe($.through2(function(file, enc, cb) {
        $.replacePath(file, enc, cb)
      }))
      .pipe($.gulp.dest('src/template/view/'))
  })

}