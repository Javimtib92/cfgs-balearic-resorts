var args          = require('yargs').argv,
    bower         = require('bower'),
    clean         = require('gulp-clean'),
    concat        = require('gulp-concat'),
    fs            = require('fs'),
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    gulpif        = require('gulp-if'),
    inject        = require('gulp-inject'),
    minifyCss     = require('gulp-minify-css'),
    ngAnnotate    = require('gulp-ng-annotate'),
    preprocess    = require('gulp-preprocess'),
    purify        = require('gulp-purifycss'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace-task'),
    runSequence   = require('run-sequence'),
    sass          = require('gulp-sass'),
    sh            = require('shelljs'),
    templateCache = require('gulp-angular-templatecache'),
    uglify        = require('gulp-uglify'),
    useref        = require('gulp-useref');

const ENV_DEV = 'dev';
const ENV_PROD = 'prod';

var paths = {
  app_js_files: [
      './www/components/**/*.js',
      './www/services/*.js',
      './www/*.js'
  ],
  sass: ['./scss/**/*.scss'],
  templatecache: ['./www/components/**/*.html', './www/directives/**/*.html'],
  useref: ['./www/*.html']
};

var env = ENV_DEV; // Initialize default environment

gulp.task('default', function() {
    if (typeof process.env.NODE_ENV === 'undefined') {
        env = ENV_DEV;
    } else {
        env = process.env.NODE_ENV;
        if ([ENV_DEV, ENV_PROD].indexOf(env) === -1) {
            env = ENV_DEV;
        }
    }

    console.log("Build for " + env + " environment");

    if (env == ENV_DEV) {
        runSequence('clean_dist',
            ['sass', 'templatecache', 'inject'],
            'inject_env_directives',
            "watch"
        )
    } else if (env == ENV_PROD) {
        runSequence('clean_dist',
            ['sass', 'templatecache', 'inject', 'ng_annotate'],
            'useref',
            'inject_env_directives',
            'clean_dist_tmp',
            'watch'
        )
    }
});

gulp.task('templatecache', function (done) {
    gulp.src(paths.templatecache)
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./www/'))
        .on('end', done);
});

gulp.task('sass', function (done) {
    gulp.src('./scss/main.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        // .pipe(purify(['./www/components/**/*.js', './www/components/**/*.html', './www/*.html', './www/*.js']))
        // .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('useref', function (done) {
    gulp.src('./www/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('./www/'))
        .on('end', done);
});

gulp.task('ng_annotate', function (done) {
    gulp.src(paths.app_js_files)
        .pipe(ngAnnotate({single_quotes: true, add: true}))
        .pipe(gulp.dest('./www/dist/tmp'))
        .on('end', done);
});

gulp.task('build_config', function () {
    // Get the environment from the command line
    var env = args.env || 'dev';

    // Read the settings from the right file
    var filename = env + '_config.json';
    var settings = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

    // Replace each placeholder with the correct value for the variable.
    gulp.src('./config/app.config.js')
        .pipe(replace({
            patterns:[
                {match: 'baseApiUrl', replacement: settings.baseApiUrl}
            ]
        }))
        .pipe(gulp.dest('www'));
});

gulp.task('inject_env_directives', function() {
    gulp.src('./www/index.html')
        .pipe(preprocess({context: { NODE_ENV: env}}))
        .pipe(gulp.dest('./www/'))
});

gulp.task('inject', function () {
    return gulp.src('./config/index.html')
        .pipe(inject(
            gulp.src(paths.app_js_files, {read: false}), {
                transform: function (filepath, file, index, length, targetFile) {
                    var filepath;
                    if (env == ENV_PROD) {
                        filepath = '/dist/tmp' + filepath.substring(4);
                    } else {
                        filepath = filepath.substring(5);
                    }

                    return inject.transform.apply(inject.transform, [filepath, file, index, length, targetFile]);
                }
            }
        ))
        .pipe(gulp.dest('./www'));
});

gulp.task('clean_dist', function () {
    return gulp.src('./www/dist', {read: false})
        .pipe(clean());
});

gulp.task('clean_dist_tmp', function () {
    return gulp.src('./www/dist/tmp', {read: false})
        .pipe(clean());
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.templatecache, ['templatecache']);
});
