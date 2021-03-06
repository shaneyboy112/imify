var gulp = require('gulp'),
    paths = require('./gulp/paths');

gulp.task('sass-clean', require('./gulp/sass-clean'));
gulp.task('sass-run', [ 'sass-clean' ], require('./gulp/sass-run'));
gulp.task('sass', [ 'sass-run' ]);

gulp.task('js-clean', require('./gulp/js-clean'));
gulp.task('js-run', [ 'js-clean' ], require('./gulp/js-run'));
gulp.task('js', [ 'js-run' ]);

gulp.task('test', require('./gulp/test-run'));

gulp.task('watch', require('./gulp/watch'));
gulp.task('default', [ 'sass', 'js' ]);
