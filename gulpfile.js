var gulp = require('gulp')
var rollup = require('rollup').rollup
var fs = require('fs')
var babel = require('rollup-plugin-babel')
var eslint = require('rollup-plugin-eslint')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var scss = require('rollup-plugin-scss')
var rename = require('gulp-rename')
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var clean = require('gulp-clean')
var postcss = require('gulp-postcss')
var cssnext = require('postcss-cssnext')
var shortcss = require('postcss-short')
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector')
var minifyHTML   = require('gulp-minify-html')

gulp.task('rollup', function() {
  return rollup({
    entry: 'src/main.js',
    plugins: [
      scss({
        output: function (styles, stylesNode) {
          fs.writeFileSync('tmp/app.css', styles)
        }
      }),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
      eslint({
        exclude: [
          'src/styles/**',
          'src/libs/**'
        ]
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  })
  .then(function (app) {
    // 输出 app + sourcemap
    var result = app.generate({
        format: 'iife'
    });

    app.write({
        format: 'cjs',
        dest: 'tmp/app.js'
    });
  })
})

gulp.task('uglify', ['minify-css'], function () {
  return gulp.src('tmp/app.js')
    .pipe(clean({ force: true }))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('dist/js/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'))
})

gulp.task('css', ['rollup'], function() {
  var plugins = [
    shortcss,
    cssnext
  ]
  return gulp.src('tmp/app.css')
    .pipe(clean({ force: true }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dev/css/'))
})

gulp.task('minify-css', ['rollup'], function() {
  var plugins = [
    shortcss,
    cssnext
  ]
  return gulp.src('tmp/app.css')
    .pipe(clean({ force: true }))
    .pipe(postcss(plugins))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(gulp.dest('dist/css/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'))
})

gulp.task('build', ['uglify'], function () {
  gulp.src(['rev/**/*.json', 'index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(minifyHTML({
        empty: true,
        spare: true
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('js', ['rollup'], function () {
  gulp.src('tmp/app.js')
    .pipe(clean({ force: true }))
    .pipe(gulp.dest('dev/js/'))
})

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('dev/'))
})

gulp.task('watch', ['html', 'js', 'css'], function () {
  gulp.watch(['src/styles/**/*.css'], ['css'])
  gulp.watch(['src/**/*.js'], ['js'])
  gulp.watch(['index.html'], ['html'])
})

gulp.task('default', ['build'])
