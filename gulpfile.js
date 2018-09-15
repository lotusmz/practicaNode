const gulp = require('gulp')
const sass = require('gulp-sass')
const gulpStylelint = require('gulp-stylelint');
const path = require('path');
const browserSync = require('browser-sync').create();

gulp.task('styles',['lint-css','webfonts'], () => {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({
      includePaths: [
        path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/scss'),
        path.join(__dirname, '/node_modules/flexboxgrid-sass/')
      ],
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('build/css/'));
})

gulp.task('webfonts', () => {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
  .pipe(gulp.dest('build/webfonts'));
})

gulp.task('html', () => {
  return gulp.src('src/**/*.{html,ico}')
    .pipe(gulp.dest('build/'))
})

gulp.task('img', () => {
    return gulp.src('src/**/*.{gif,jpg,png,svg}')
      .pipe(gulp.dest('build/'))
  })

gulp.task('lint-css', () => {

    return gulp.src('src/scss/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});
 
gulp.task('build', [
  'html',
  'img',
  'styles',
], done => done());

gulp.task('dev', ['build'], function() {

  browserSync.init({
      server: "./build"
  });
  gulp.watch("src/**", ['reload']);
});

gulp.task('reload', ['build'], function () {
  browserSync.reload();
});