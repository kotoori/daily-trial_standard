const gulp = require("gulp");

const htmlBeautify = require("gulp-html-beautify");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const gulpIgnore = require("gulp-ignore");

const browserSync = require("browser-sync");

/*===============================
html
===============================*/
//gulp-html-beautifyのオプション設定(コメント未記載のオプションは、デフォルト値のまま)
const htmlBeautyOption = {
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
};

//srcディレクトリのHTMLをフォーマット
function formatHTML(){
	return gulp.src("./src/**/*.html")	//入力ファイル
	.pipe(htmlBeautify(htmlBeautyOption))
	.pipe(gulp.dest("./src/"));	//出力先
}
exports.formatHTML = formatHTML;


//publicにHTMLをコピー
function copyHTML(){
	return gulp.src("./src/**/*.html")	//入力ファイル
	.pipe(htmlBeautify(htmlBeautyOption)) //HTMLをフォーマット
	.pipe(gulp.dest("./public/"));	//出力先
}
exports.copyHTML = copyHTML;

/*===============================
CSS生成
===============================*/
function compileSass(){
	return gulp.src("./src/assets/sass/**/*.scss")	//入力ファイル
	.pipe(gulp.dest("./public/assets/sass"))	//sassコピー
	.pipe(sass())	//dart-sassでコンパイル
	.pipe(postcss([	//Sass差し替え
		autoprefixer(),	//ベンダープレフィックス付与
		cssSorter({order:"concentric-css"}), //cssソート
	]))
	.pipe(mmq())	//media queryをまとめる
	.pipe(gulp.dest("./public/assets/css"))	//圧縮前CSS出力
	.pipe(cleanCss())
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest("./public/assets/css"));	//min.css出力
}
exports.compileSass = compileSass;

/*===============================
サードパーティCSSコピー
===============================*/
function copyCSS(){
	return gulp.src("./src/assets/css/**/*")
	.pipe(gulp.dest("./public/assets/css"));
}


/*===============================
jsコピー & min.js生成
===============================*/
//jsをコピー（.minも生成）
function copyJS(){
	return gulp.src("./src/assets/js/**/*.js")
	.pipe(gulp.dest("./public/assets/js"))//圧縮前JS出力
	.pipe(gulpIgnore.exclude("**/*.min.js")) //.min.jsは以降の処理を行わない
	.pipe(uglify())	//JS圧縮
	.pipe(rename({	//.min.jsにリネーム
		suffix: ".min"
	}))
	.pipe(gulp.dest("./public/assets/js"));//min.js出力
}
exports.copyJS = copyJS;

/*===============================
画像コピー
===============================*/
function copyImg(){
	return gulp.src("./src/assets/img/**/*")
	.pipe(gulp.dest("./public/assets/img"));
}

/*===============================
フォントファイルコピー
===============================*/
function copyFonts(){
	return gulp.src("./src/assets/fonts/**/*")
	.pipe(gulp.dest("./public/assets/fonts"));
}

/*===============================
ブラウザ自動リロード
===============================*/
//ブラウザ立ち上げ
function browserInit(done){
	browserSync.init({
		server:{
			baseDir:"./public"
		}
	});
	done();
}

//立ち上げたブラウザの自動リロード
function browserReload(done){
	browserSync.reload();
	done();
}

/*===============================
タスク起動
===============================*/
//sassコンパイルの自動実行
function watch(){
	gulp.watch("./src/**/*.html", gulp.series(copyHTML, browserReload));	//htmlファイルの監視
	gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserReload));	//scssファイルの監視
	gulp.watch("./src/assets/css/**/*.css", gulp.series(copyCSS,browserReload)); //cssファイルの監視
	gulp.watch("./src/assets/js/**/*.js", gulp.series(copyJS,browserReload)); //jsファイルの監視
	gulp.watch("./src/assets/img/**/*", gulp.series(copyImg, browserReload)); //imgファイルの監視
	gulp.watch("./src/assets/fonts/**/*", gulp.series(copyFonts, browserReload)); //フォントファイルの監視
}

/*===============================
ビルド
===============================*/
function build(done){
	copyHTML();
	compileSass();
	copyCSS();
	copyJS();
	copyImg();
	copyFonts();
	done();
}

/*===============================
タスク起動
===============================*/

exports.dev = gulp.parallel(build, browserInit, watch);

exports.build = gulp.parallel(copyHTML, compileSass, copyCSS, copyJS, copyImg, copyFonts)