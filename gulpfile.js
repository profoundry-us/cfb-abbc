// Setup some variables
var env = {
  paths: {
    app: "app",
    build: "build/debug",
    bower: "bower_components"
  }
};

// Require our basic utilities
var del = require("del");
var path = require("path");

// Require all of our gulp-related plugins/utilities
var gulp = require("gulp");
var browserSync = require("browser-sync");
var $ = require("gulp-load-plugins")({
  pattern: ["gulp-*", "main-bower-files", "run-sequence"]
});


// Clean our build directory before starting anything
gulp.task("clean", function(cb) {
  del(env.paths.build, { force: true }, cb);
});


// Copy our app-related files
gulp.task("build:debug:copy:app", function() {
  return gulp.src(path.join(env.paths.app, "**/*")).pipe(gulp.dest(path.join(env.paths.build, env.paths.app)));
});


// Copy all files
gulp.task("build:debug:copy", function(cb) {
  $.runSequence("build:debug:copy:app", cb);
});


// Inject the bower files into the index.html
gulp.task("build:debug:inject", function() {
  var target = gulp.src(path.join(env.paths.app, "index.html"));
  var bowerFiles = gulp.src($.mainBowerFiles(), { read: false });
  var appFiles = gulp.src(path.join(env.paths.build, env.paths.app, "**/*.js"), { read: false });

  return target
    .pipe($.inject(bowerFiles))
    .pipe($.inject(appFiles, { name: "app", transform: function(filePath) {
      // Remove the "build/debug" from the start of all of the files
      var toReplace = path.join(env.paths.build, env.paths.app, "/");
      var newPath = filePath.replace(toReplace, "");

      return $.inject.transform.apply($.inject.transform, [newPath]);
    }}))
    .pipe(gulp.dest(path.join(env.paths.build, env.paths.app)));
});


// Run the debug build
gulp.task("build:debug", function(cb) {
  $.runSequence("clean", "build:debug:copy", "build:debug:inject", cb);
});

gulp.task("serve", ["build:debug"], function(cb) {
  browserSync({
    server: {
      baseDir: "build/debug/app",
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });
});

gulp.task("default", function(cb) {
  $.runSequence("serve");
});
