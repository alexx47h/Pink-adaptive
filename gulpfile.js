"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var minifycss = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var minifyjs = require("gulp-minify");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var del = require("del");

gulp.task("style", ["copy"], function() {
  return gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minifycss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("stdev", function() {
  return gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["stdev"]);
  gulp.watch("*.html", ["html:update"]);
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy",["clean"], function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**/*.{png,jpg,svg}",
    "js/**/*.js",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("miniimages", function() {
  gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo({plugins: [{removeViewBox: false}]})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("minijs", function() {
  gulp.src(["build/js/**/*.js","!build/js/**/*.min.js"])
    .pipe(minifyjs({
        ext:{
            src:".js",
            min:".min.js"
        }
    }))
    .pipe(gulp.dest("build/js"))
});


gulp.task("minify", ["style"], function() {
  gulp.run(
    "miniimages",
    "minijs"
  );
});

gulp.task("build", function(fn) {
  gulp.run(
    "clean",
    "copy",
    "style",
    "minify",
    fn
  );
});