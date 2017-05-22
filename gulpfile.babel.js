import gulp from 'gulp';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';

const {NODE_ENV} = process.env;
const isDev = NODE_ENV === 'development';

gulp.task('sass', () => {
  const outputStyle = isDev ? 'expanded' : 'compressed';
  return gulp.src('./src/style/**/*.scss')
    .pipe(sass({outputStyle}).on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./public/style'));
});

gulp.task('pug', () => {
  const pretty = isDev ? true : false;
  return gulp.src('./src/**/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty}))
    .pipe(gulp.dest('./public'));
});

gulp.task('vendor', () => {
  return gulp.src('./vendor/**/*.*')
    .pipe(gulp.dest('./public/vendor'))
});

gulp.task('build', ['sass', 'pug', 'vendor']);

gulp.task('watch', ['sass', 'pug', 'vendor'], () => {
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch('./src/style/**/*.scss', ['sass']);
  gulp.watch('./vendor/**/*.*', ['vendor']);
});
