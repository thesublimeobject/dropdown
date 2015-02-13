# KBD Modal
a pure javascript dropdown for styling select menus. orignally ported from codrops, but completely rewritten in plain javascript (coffeescript) with some changes and additions.

## Install
`npm install kbd-dropdown`

## Usage
```
menu = document.querySelectorAll 'select[id^="menu-"]'
d = new dropdown(menu)
d.init()
```

The HTML:

```
<div class="select-ctn">
	<select id="menu-sort-resources-type">
		<option value="type">Type</option>
		<option value="blog">Blog</option>
		<option value="webinars">Webinars</option>
		<option value="whitepapers">Whitepapers</option>
		<option value="ebooks">eBooks</option>
	</select>
</div>
```

To include the .scss file in your project, you can use something like the following structure:

```javascript
gulp         = require('gulp')
sass         = require('gulp-sass')
dropdown	 = require('kbd-dropdown').includePaths

gulp.task 'sass', ->
	return gulp.src('screen.scss')
		.pipe(sass
			includePaths: ['sass'].concat(dropdown)
		)
		.pipe(gulp.dest(config.dest))
```