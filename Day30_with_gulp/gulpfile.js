const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter =require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync");

const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const htmlBeautify = require("gulp-html-beautify");

function test(done){
  console.log('Hello gulp');
  done();
}

function compileSass(){
  return gulp.src("./src/assets/sass/**/*.scss")
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(), 
    cssSorter({order: "alphabetical"}),
  ]))
  .pipe(mmq())
  .pipe(cleanCss())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest("./public/assets/css"))
}

function watch(){
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserReload));
  gulp.watch("./src/**/*.html", gulp.series(formatHTML, browserReload));
  gulp.watch("./src/assets/js/**/*.js", gulp.series(minJs, browserReload));
  gulp.watch("./src/assets/images/**/*", gulp.series(copyImage, browserReload));
  gulp.watch("./src/assets/fonts/**/*", gulp.series(copyFonts, browserReload));
  gulp.watch("./src/assets/css/**/*", gulp.series(copyVendorCss, browserReload));
  gulp.watch("./src/assets/js/vendor/**/*", gulp.series(copyVendorJS, browserReload));
}

// gulp.task('watch', function() {
// 	gulp.watch('./src/**/*.scss', compileSass);
// });

//ブラウザを立ち上げる
function browserInit(done){
  browserSync.init({
    server:{
      baseDir:"./public"
    }
  });
  done();
}
//立ち上げたブラウザをリロードする
function browserReload(done){
  browserSync.reload();
  done();
}

function minJs(){
  return gulp.src("./src/assets/js/*.js")
  //
  .pipe(gulp.dest("./public/assets/js"))
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest("./public/assets/js"))
}

function formatHTML(){
  return gulp.src("./src/**/*.html")
  .pipe(htmlBeautify({
    "indent_size": 2, //インデントのサイズ
    "indent_char": " ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": true, //true:インデントをタグにする
    "preserve_newlines": true,
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
  }))
  .pipe(gulp.dest("./public"))

}

function copyImage(){
  return gulp.src("./src/assets/images/**/*")
  .pipe(gulp.dest("./public/assets/images/"))
}

function copyFonts(){
  return gulp.src("./src/assets/fonts/**/*")
  .pipe(gulp.dest("./public/assets/fonts/"))
}

function copyVendorCss(){
  return gulp.src("./src/assets/css/**/*")
  .pipe(gulp.dest("./public/assets/css/"))
}

function copyVendorJS(){
  return gulp.src("./src/assets/js/vendor/**/*")
  .pipe(gulp.dest("./public/assets/js/"))
}

exports.mytest = test;
exports.compileSass = compileSass;
exports.watch = watch;
exports.browserInit = browserInit;
exports.dev = gulp.parallel(browserInit, watch );
exports.minJs = minJs;
exports.formatHTML = formatHTML;
exports.build = gulp.parallel(formatHTML, minJs, compileSass, copyVendorCss, copyImage, copyFonts, copyVendorJS);
