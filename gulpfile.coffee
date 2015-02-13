gulp   = require 'gulp'
coffee = require 'gulp-coffee'
gutil  = require 'gulp-util'

gulp.task 'coffee', ->
	gulp.src('./index.coffee')
		.pipe(coffee({ bare: true }).on('error', gutil.log))
		.pipe(gulp.dest('./'))