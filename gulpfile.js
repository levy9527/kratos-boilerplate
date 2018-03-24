'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const poststylus = require('poststylus');
const rucksack = require('rucksack-css');
const prefixer = require('autoprefixer');
const fontMagician = require('postcss-font-magician');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const lost = require('lost');
const rupture = require('rupture');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const mdcss = require('mdcss');
const fs = require('fs');
const del = require('del');
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector');
const runSequence = require('run-sequence');
const newer = require('gulp-newer');

const srcApp = {
  js: [
    'src/js/**/*.js'
  ],
  css: 'src/styl/**/*.styl',
  html: 'src/jade/**/*.jade',
  img: 'src/images/**/*',
};

const buildApp = {
  build: 'build/**/*',
  js: 'build/js/',
  css: 'build/css/',
  html: 'build/',
  img: 'build/images',
};

let dataJson = {};
let files = [];


gulp.task('css', () => {
  return gulp.src(srcApp.css)
    .pipe(newer(buildApp.css))
    .pipe(plumber())
//    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [
        rupture(),
        poststylus([
          lost(),
          fontMagician(),
          rucksack(),
          //flexibility(),
          prefixer()
        ])
      ],
      compress: false
    }))
    .pipe(gcmq())
    .pipe(cssnano())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildApp.css));
});

gulp.task('js', () => {
  return gulp.src(srcApp.js)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildApp.js));
});

gulp.task('html', () => {
  return gulp.src(srcApp.html)
    .pipe(newer(buildApp.html))
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(buildApp.html));
});

gulp.task('images', () => {
  return gulp.src(srcApp.img)
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(buildApp.img));
});


gulp.task('watch', () => {
  gulp.watch(srcApp.html, { debounceDelay: 300 }, ['html']);
  gulp.watch(srcApp.css, ['css']);
  gulp.watch(srcApp.js, ['js']);
  gulp.watch(srcApp.img, ['images']);
  gulp.watch(srcApp.icons, ['icons']);
});

gulp.task('browser-sync', () => {
  var files = [
    buildApp.build
  ];

  browserSync.init(files, {
    server: {
      baseDir: './build/'
    },
		port: 8080
  });

});

gulp.task('cleanHash', function() {
  return del([buildApp.css + '*-*.css', buildApp.js + '*-*.js'])
});

gulp.task('hash', function () {
  return gulp.src([buildApp.css + '*.css', buildApp.js + '*.js'], {base: 'build'})
    .pipe(rev())
    .pipe(gulp.dest('build')) //css文件会在指定文件夹下生成的css文件夹中, 即 build/css
    .pipe(rev.manifest())
    .pipe(gulp.dest('build')); // manifest在指定文件夹下, 即 build
})

gulp.task('injectHash', function () {
  return gulp.src(['build/rev-*.json', 'build/*.html'])
    .pipe( revCollector({
      replaceReved: true,
      dirreplacements: {
        'css': 'css',
        'js': 'js',
      }
    }))
    .pipe( gulp.dest('build') );
})

gulp.task('deploy', () => {
  // TODO gulp.series
  runSequence('cleanHash', 'hash', 'injectHash')
})

gulp.task('clean', function() {
  return del('build')
});

gulp.task('build', ['clean'], () => {
  gulp.start(
    'html',
    'css',
    'js',
    'images'
  );
});

gulp.task('default', [
  'build',
  'watch',
  'browser-sync'
]);

gulp.task('server', [
  'watch',
  'browser-sync'
]);
