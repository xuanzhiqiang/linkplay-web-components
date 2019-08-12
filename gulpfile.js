const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () =>
  gulp
    .src('componen/**/*.{js,jsx}')
    .pipe(
      babel({
        envName: process.env.NODE_ENV || 'production',
        configFile: './.babelrc'
      })
    )
    .pipe(gulp.dest('dist'))
);
