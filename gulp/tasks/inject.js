
module.exports = function() {


  $.gulp.task('inject', function () {
    // let css = $.gulp.src($.destCss);

    let css = $.gulp.src($.dev ? './dist/assets/css/*.css' : './dist/assets/css/*.min.css');  
    let js = $.gulp.src([$.destJs, '!./dist/assets/js/index.bundle.js']);
    let jsBody = $.gulp.src('./dist/assets/js/index.bundle.js');
    
    return $.gulp.src($.destHtml)
      .pipe($.inject( css, { relative:true, addPrefix: '.' } ))
      .pipe($.inject( js, { relative:true, addPrefix: '.' } ))
      .pipe($.inject(jsBody, {name: 'body', relative:true, addPrefix: '.'}))
      .pipe($.gulpIf(!$.dev, $.htmlclean()))
      .pipe($.gulp.dest($.dist));
  });


}