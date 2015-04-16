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


// Compile our SCSS files
gulp.task("sass", function() {
  return $.rubySass(path.join(env.paths.app, "app.scss"))
    // Write out our new CSS file
    .pipe(gulp.dest(path.join(env.paths.build, env.paths.app)))

    // Pipe our CSS changes to browserSync so it can detect them
    .pipe(browserSync.reload({ stream: true }));
});


// Transpile our ES6 code into ES5 using traceur
gulp.task("build:debug:transpile", function() {
  var inPath = path.join(env.paths.app, "**/*.es6");
  var outPath = path.join(env.paths.build, env.paths.app);

  return gulp.src([
      $.traceur.RUNTIME_PATH,
      inPath
    ])
    .pipe($.traceur({ modules: "inline" }))
    .pipe($.rename(function(path) {
      // Rename our files from .es6 to .js
      path.extname = ".js";
    }))
    .pipe(gulp.dest(outPath));
});


// Copy all relevant files
gulp.task("build:debug:copy", function(cb) {
  return gulp.src(path.join(env.paths.app, "**/*.{html,js}")).pipe(gulp.dest(path.join(env.paths.build, env.paths.app)));
});


// Inject the bower files into the index.html
gulp.task("build:debug:inject", function() {
  var target = gulp.src(path.join(env.paths.app, "index.html"));
  var bowerFiles = gulp.src($.mainBowerFiles(), { read: false });
  var appFiles = gulp.src(path.join(env.paths.build, env.paths.app, "**/*.{js,css}"), { read: false });

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


// Run all of the build tasks
gulp.task("build:tasks", function(cb) {
  $.runSequence("sass", "build:debug:transpile", "build:debug:copy", "build:debug:inject", cb);
});


// Run the debug build
gulp.task("build:debug", function(cb) {
  $.runSequence("clean", "build:tasks", cb);
});


// Serve our files
gulp.task("serve", ["build:tasks"], function(cb) {
  browserSync({
    server: {
      baseDir: "build/debug/app",
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });

  var appFilesPath = path.join(env.paths.app, "**/*.{html,js,es6}");
  var appSCSSPath = path.join(env.paths.app, "**/*.scss");
  var buildIndexPath = path.join(env.paths.build, env.paths.app, "index.html");

  // Watch our files for changes and rerun the copy/inject tasks
  gulp.watch(appFilesPath, ["build:debug"]);

  // Watch our SCSS files for changes
  gulp.watch(appSCSSPath, ["sass"]);

  // Watch our built index.html for changes and reload the browser
  // Temporarily remove this as it doesn't seem to work quite right with Angular...
  //gulp.watch(buildIndexPath).on("change", browserSync.reload);
});

gulp.task("default", function(cb) {
  $.runSequence("serve");
});
