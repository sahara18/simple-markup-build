import gulp from 'gulp';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';

const {NODE_ENV} = process.env;
const isDev = NODE_ENV === 'development';

gulp.task('sass', () => {
  const outputStyle = isDev ? 'expanded' : 'compressed';
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass({outputStyle}).on('error', sass.logError))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('pug', () => {
  const pretty = isDev ? true : false;
  return gulp.src('./src/**/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty}))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', ['sass', 'pug']);

gulp.task('watch', ['sass', 'pug'], () => {
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});
