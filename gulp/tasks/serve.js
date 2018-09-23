module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: false,
      notify: false,
      server: $.dist,
      port: 9000
    });
    $.browserSync.watch(['src/**/*.*', '!**/*.css'], $.browserSync.reload);
  });
}