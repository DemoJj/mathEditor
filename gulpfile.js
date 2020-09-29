var gulp = require('gulp')
var plugins = require('gulp-load-plugins')()

var jsPath = [
    'src/js/*.js'
]
var cssPath = [
    'src/css/*.css'
]
var lessPath = [
    'src/css/*.less'
]

gulp.task('jscompress',done=>{
    console.log('Gulp js...')
    gulp.src(jsPath)
    .pipe(plugins.babel({
        presets:['es2015']
    }))
    .pipe(plugins.uglify())
    .on('error',function(err){
        plugins.util.log(plugins.util.colors.red('[Error]'),err.toString())
    })
    .pipe(plugins.concat('mathEdit.min.js'))
    .pipe(gulp.dest('dist'))

    done()
})

gulp.task('lesstask',done=>{
    console.log('Gulp less...')

    gulp.src(lessPath)
    .pipe(plugins.less())
    .pipe(gulp.dest('src/css'))
    .on('end',function(){
        done()
    })
})
gulp.task('csstask',done=>{
    console.log('Gulp css...')
    gulp.src(cssPath)
    .pipe(plugins.cleanCss())
    .on('error',function(err){
        plugins.util.log(plugins.util.colors.red('[Error]'),err.toString())
    })
    .pipe(plugins.concat('mathEdit.min.css'))
    .pipe(gulp.dest('dist'))
    done()
})

gulp.task('csscompress',gulp.series('lesstask','csstask'))

gulp.task('auto', function () {
    gulp.watch(jsPath, gulp.series('jscompress'));
    gulp.watch(cssPath, gulp.series('csscompress'));
});

exports.lib = gulp.series('jscompress','csscompress')