const gulp = require("gulp");
const del = require("del");
const concat = require("gulp-concat");
const livereload = require("gulp-livereload");
const webserver = require("gulp-webserver");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const gutil = require("gulp-util");
const watchify = require("watchify");
const sass = require("gulp-sass");

/**
 * List of misc assets that will be simply copied
 */
const htmlFilePath = "./src/index.html";
const audioPath = "./src/assets/audio/**/*";
const graphicsPath = "./src/assets/graphics/**/*";

gulp.task("copy-html", function() {
  return gulp
    .src(htmlFilePath)
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
});

gulp.task("copy-audio", function() {
  return gulp
    .src(audioPath)
    .pipe(gulp.dest("dist/assets/audio"))
    .pipe(livereload());
});

gulp.task("copy-graphics", function() {
  return gulp
    .src(graphicsPath)
    .pipe(gulp.dest("dist/assets/graphics"))
    .pipe(livereload());
});

/**
 * copy miscs assets
 */

gulp.task(
  "copy-assets",
  gulp.parallel("copy-html", "copy-audio", "copy-graphics")
);

gulp.task("browserify", function() {
  try {
    return browserify({
      basedir: ".",
      debug: true,
      entries: ["src/app.ts"],
      cache: {},
      packageCache: {}
    })
      .plugin(tsify)
      .bundle()
      .pipe(source("game.js"))
      .pipe(gulp.dest("dist"));
  } catch (error) {
    console.log(e);
    return;
  }
});

/**
 * clean dist folder
 */
gulp.task("clean", function() {
  return del(["./dist/"]);
});

gulp.task("clean-temps-scripts", function() {
  return del(["./dist/scripts"]);
});

var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/app.ts"],
    cache: {},
    packageCache: {}
  }).plugin(tsify)
);

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source("game.js"))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
}

gulp.task("compile", gulp.series("clean-temps-scripts"));

gulp.task("watchers", function() {
  livereload.listen();
  gulp.watch(htmlFilePath, gulp.series("copy-html"));
  gulp.watch(audioPath, gulp.series("copy-audio"));
  gulp.watch(graphicsPath, gulp.series("copy-html"));

  gulp.watch("./src/**/*.scss", gulp.series("sass"));
});

gulp.task("sass", function() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist"))
    .pipe(livereload());
});

gulp.task("webserver", function() {
  return gulp.src("dist").pipe(
    webserver({
      livereload: true,
      directoryListing: false,
      open: false
    })
  );
});

gulp.task("default", gulp.series("clean", "copy-assets", "sass"), bundle());

gulp.task(
  "dev",
  gulp.series("default", gulp.parallel("webserver", "watchers"))
);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
