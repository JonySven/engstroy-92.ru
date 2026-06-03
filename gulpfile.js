const source_folder = "app";
const project_folder = "dist";

let path = {
  src: {
    html: source_folder + "/*.html",
    css: source_folder + "/scss/*.scss",
    js: source_folder + "/js/*.js",
    documents: source_folder + "/documents/**/*",
    img: source_folder + "/img/**/*",
    fonts: source_folder + "/fonts/*.*",
    sitemap: source_folder + "/sitemap.xml",
    robots: source_folder + "/robots.txt",
  },
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    documents: project_folder + "/documents/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
    sitemap: project_folder + "/",
    robots: project_folder + "/",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/**/*.scss",
    js: source_folder + "/**/*.js",
    img: source_folder + "/img/**/*",
  },
  clean: "./" + project_folder
};

const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const scss = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");

// Оптимизация HTML
function html() {
  return gulp
    .src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(project_folder))
    .pipe(browserSync.stream());
}

// Копирование документов
function documents() {
  return gulp
    .src(path.src.documents)
    .pipe(gulp.dest(path.build.documents));
}

// Копирование шрифтов
function fonts() {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
}

// Копирование sitemap
function sitemap() {
  return gulp
    .src(path.src.sitemap)
    .pipe(gulp.dest(path.build.sitemap));
}

// Копирование robots.txt
function robots() {
  return gulp
    .src(path.src.robots)
    .pipe(gulp.dest(path.build.robots));
}

// Компиляция и оптимизация CSS
function css() {
  return gulp
    .src(path.src.css)
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
}

// Минификация JS
function js() {
  return gulp
    .src(path.src.js)
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
}

// Копирование изображений
function imageminApp() {
  return gulp
    .src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
}
// Очистка папки сборки
function clean() {
  return del(path.clean);
}

// Запуск сервера и автообновление
function browserSyncServe() {
  browserSync.init({
    server: {
      baseDir: "./" + project_folder
    },
    port: 4200,
    notify: false
  });
}

// Наблюдение за изменениями
function watchFiles() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.css, css);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, imageminApp);
}

// Сборка проекта
const build = gulp.series(clean, html, js, css, imageminApp, documents, fonts, sitemap, robots);

// Разработка с автообновлением
const watch = gulp.parallel(build, watchFiles, browserSyncServe);

exports.html = html;
exports.documents = documents;
exports.js = js;
exports.css = css;
exports.imageminApp = imageminApp;
exports.fonts = fonts;
exports.sitemap = sitemap;
exports.robots = robots;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
