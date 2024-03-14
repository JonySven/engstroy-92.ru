const source_folder = "app";
const project_folder = "dist";

let path = {
  src: {
    html: source_folder + "/*.html",
    css: source_folder + "/scss/*.scss",
    js: source_folder + "/js/*.js",
    documents: source_folder + "/docs/**/*",
    img: source_folder + "/img/**",
    captcha: source_folder + "/captcha/*.js",
    robots: source_folder + "/*.txt",
    siteMap: source_folder + "/*.xml"
  },
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    documents: project_folder + "/docs/",
    img: project_folder + "/img/",
    captcha: project_folder + "/captcha/",
  },

  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/**/*.scss",
    js: source_folder + "/**/*.js",
    img: source_folder + "/img/",
  },
  clean: "./" + project_folder + "/",
};

const gulp = require("gulp"),
  htmlmin = require("gulp-htmlmin"),
  browserSyncApp = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  scss = require('gulp-sass')(require('sass'));
  replace = require("gulp-replace");
  let rename = require("gulp-rename");
  let cleanCSS = require("gulp-clean-css");
let argv = require('yargs').argv; // The contemporary library of choice for parsing command arguments (in this case flags)
let fs = require('fs'); // Read a file

function html() {
  return gulp
    .src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(project_folder))
    .pipe(browserSyncApp.stream());
}

async function css() {
  return gulp
    .src(path.src.css)
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSyncApp.stream());
}

function js() {
  return gulp
    .src(path.src.js)
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(path.build.js));
}

async function captcha() {
  return gulp
      .src(path.src.captcha)
      .pipe(gulp.dest(path.build.captcha))
}

gulp.task("browserSyncApp", function () {
  browserSyncApp.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    notify: false,
  });
});

async function imageminApp() {
  gulp
    .src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSyncApp.stream());
}

async function robots() {
  return gulp
  .src(path.src.robots)
  .pipe(gulp.dest(project_folder))
}

async function siteMap() {
  return gulp
  .src(path.src.siteMap)
  .pipe(gulp.dest(project_folder))
}

gulp.task("removedist", function () {
  return del("dist");
});


async function replaceApiUrl() {
  const settings = JSON.parse(fs.readFileSync('environment-config.json', 'utf8'));
  const env = argv.env;
  const settingsEnv = settings[env] ? settings[env] : settings['prod'];
  gulp.src(['./dist/index.html', './dist/index.html', './dist/js/scripts.min.js'])
      .pipe(replace('@@apiUrl', settingsEnv.apiUrl))
      .pipe(replace('@@captchaKey', settingsEnv.captchaKey))
      .pipe(replace('@@mailApiUrl', settingsEnv.mailApiUrl))
      .pipe(gulp.dest(function(file) {
        return file.base;
      }));
};

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], imageminApp);
}

const build = gulp.series("removedist", html, js, replaceApiUrl, gulp.parallel(css, imageminApp,   captcha, robots, siteMap));

const watch = gulp.parallel(build, watchFiles, "browserSyncApp");

exports.html = html;
exports.js = js;
exports.css = css;
exports.imageminApp = imageminApp;
exports.watch = watch;
exports.build = build;
exports.captcha = captcha;
exports.robots = robots;
exports.siteMap = siteMap;
