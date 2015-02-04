var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	imagemin = require('gulp-imagemin')
	prefixer = require('gulp-autoprefixer')  
	jade = require('gulp-jade')
	connect = require('gulp-connect');


function errorLog(error) {          
	console.error.bind(error);
	this.emit('end')
}


//Html compiling
gulp.task('jade', function(){
	gulp.src('jade/*.jade')
	.pipe(jade({pretty: true}))
	//.on('error', errorLog)
	.pipe(gulp.dest('build')) 
	.pipe(connect.reload());
});

// Script Task  
// Uglifies
gulp.task('scripts', function(){     
	gulp.src('js/*.js')
	// .pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(connect.reload());
});
 
//Style Task
//Uglifies
gulp.task('stylus', function(){
	gulp.src('stylus/*.styl')       
	.pipe(stylus({compress:false}))
	.pipe(prefixer({browsers: ['last 2 versions']}))
	.on('error', errorLog)
	.pipe(gulp.dest('build/css'))
	.pipe(connect.reload());
})

// Image Task
// Compress
gulp.task('images', function(){
	gulp.src('img/*')
	.pipe(imagemin())
	.on('error', errorLog)
	.pipe(gulp.dest('build/img'))
	.pipe(connect.reload());
});

// Watch Task
// Watches JS & stylus
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('jade/*.jade', ['jade']);
	gulp.watch('filters/*.svg', ['jade']);		
	gulp.watch('stylus/*.styl', ['stylus'])
	gulp.watch('img/*', ['images']);
});

gulp.task('connect', function(){
	connect.server({
		root: 'build', 
		livereload: true
	});
});


gulp.task('default', ['jade', 'stylus', 'scripts', 'images', 'watch', 'connect']);
