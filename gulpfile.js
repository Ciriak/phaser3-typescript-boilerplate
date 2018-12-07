const gulp = require("gulp");
const del = require("del");
const ts = require("gulp-typescript");
const concat = require("gulp-concat");
const livereload = require("gulp-livereload");
const webserver = require("gulp-webserver");
const typescript = ts.createProject("./tsconfig.json");
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
  return gulp.src(htmlFilePath).pipe(gulp.dest("dist"));
});

gulp.task("copy-audio", function() {
  return gulp.src(audioPath).pipe(gulp.dest("dist/assets/audio"));
});

gulp.task("copy-graphics", function() {
  return gulp.src(graphicsPath).pipe(gulp.dest("dist/assets/graphics"));
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

gulp.task("concat-scripts", function() {
  return gulp
    .src("./dist/scripts/**/*.js")
    .pipe(concat("game.js"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("clean-temps-scripts", function() {
  return del(["./dist/scripts"]);
});

gulp.task("typescript", function() {
  return gulp
    .src("./src/**/*.ts")
    .pipe(typescript())
    .pipe(gulp.dest("dist/scripts"));
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

gulp.task(
  "compile",
  gulp.series("typescript", "concat-scripts", "clean-temps-scripts")
);

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
  gulp.src("dist").pipe(
    webserver({
      livereload: true,
      directoryListing: false,
      open: true
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
