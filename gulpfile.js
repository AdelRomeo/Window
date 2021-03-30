"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

//const dist = "./dist/";
const dist = "E:\\OpenServer\\OSPanel\\domains\\Window";

//отслеживание изменении html файла
gulp.task("copy-html", () => {
  //берем нужный файл
  return gulp.src("./src/index.html")
    //перемещаем файла в соответствующие папку
    .pipe(gulp.dest(dist))
    //запускаем browsersync для перезагрузки страницы
    .pipe(browsersync.stream());
});

//компиляция скриптов
gulp.task("build-js", () => {
  //обращаем к главному js файлу
  return gulp.src("./src/js/main.js")
    //запускаем на нем webpack
    .pipe(webpack({
      //устанавливаем режим разработки
      mode: 'development',
      //конечный файл компиляции
      output: {
        filename: 'script.js'
      },
      watch: false,
      //создание карты проекта
      devtool: "source-map",
      //настройки webpack
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    //отправляем получившийся файл в конечную папку
    .pipe(gulp.dest(dist))
    //перезагружаем страницу если были изменения в файле
    .on("end", browsersync.reload);
});

//отслеживание изменений всех файлов в конкретной папке
gulp.task("copy-assets", () => {
  //путь к отслеживаемым файлам
  return gulp.src("./src/assets/**/*.*")
    //перемещаем файла в соответствующие папку
    .pipe(gulp.dest(dist + "/assets"))
    //запускаем browsersync для перезагрузки страницы
    .on("end", browsersync.reload);
});

//отслеживание изменений файлов
gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
  return gulp.src("./src/js/main.js")
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));