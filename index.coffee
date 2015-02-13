#*--------------------------------------------------------#
	# Select Menu -> Dropdown
#*--------------------------------------------------------#

classie = require 'classie'

class Dropdown

	constructor: (el) ->
		@el = el

	transformSelect: ->
		optionsHTML = ''
		label = ''
		value = -1

		[].forEach.call @el.children, (el) ->
			val = el.getAttribute 'value'
			classes = el.getAttribute 'class'
			selected = el.getAttribute 'selected'
			label = el.textContent

			if val isnt -1
				optionsHTML +=
					if classes?
						'<li data-value="' + val + '"><span class="' + classes + '">' + label + '</span></li>'
					else
						'<li data-value="' + val + '"><span>' + label + '</span></li>'

			if selected?
				selectLabel = label
				value = val

		@el.insertAdjacentHTML('afterend', '<div class="cd-dropdown"></div>')
		@drop = @el.parentNode.querySelector('.cd-dropdown')
		ul = document.createElement('ul')
		@drop.appendChild(ul)
		@listofOptions = @drop.querySelector('ul')
		@listofOptions.innerHTML = optionsHTML
		@listofOptions.insertAdjacentHTML('beforebegin', '<span></span>')
		@selectLabel = @listofOptions.parentNode.querySelector('span')
		@selectLabel.textContent = if selectLabel? then selectLabel else @listofOptions.firstChild.firstChild.textContent
		@el.parentNode.removeChild(@el)
		return value


	layout: ->
		_this = @
		@zIndex = 1000
		value = @transformSelect()
		@options = @listofOptions.children
		@optionsCount = @options.length
		@size = 
			w: @drop.offsetWidth
			h: @drop.offsetHeight

		elName = @el.getAttribute 'name'
		elId = @el.getAttribute 'id'
		inputName = if el? then elName else (if elId? then elId else 'cd-dropdown-' + (new Date()).getTime() )

		@listofOptions.insertAdjacentHTML('beforebegin', '<input type="hidden" name="' + inputName + '" value="' + value + '"></input>')
		@inputEl = @drop.querySelector 'input[name="' + inputName + '"]'

		@selectLabel.style.zIndex = @zIndex + @optionsCount
		@positioning()
		# if Modernizr.csstransitions
		setTimeout ->
			[].forEach.call _this.options, (el) ->
				el.style.transition = 'all 300ms ease-in'
				return
		, 25
		return

	positioning: (anim) ->
		_this = @

		@listofOptions.style.height = 'auto'
		[].forEach.call @options, (el, i) ->
			el.style.zIndex = _this.zIndex + _this.optionsCount - 1 - i
			el.style.top = 0
			el.style.let = 0
			el.style.marginLeft = 0
			el.style.opacity = 1
			el.style.transform = 'none'

	onOptionSelect: (opt) ->
		return false

	initEvents: ->
		_this = @

		@selectLabel.addEventListener 'mousedown', (event) ->
			if _this.opened then _this.close() else _this.open()
			return false

		[].forEach.call @options, (el) ->
			el.addEventListener 'click', ->
				if _this.opened
					option = @
					console.log option
					_this.inputEl.setAttribute('value', option.getAttribute('data-value') )
					_this.selectLabel.innerHTML = option.innerHTML
					_this.close()
				return
			return

	open: ->
		_this = @
		classie.toggle(@drop, 'cd-active')
		@listofOptions.style.height = ( @optionsCount + 1 ) * @size.w + 'px'

		[].forEach.call @options, (el, i) ->
			el.style.opacity = 1
			el.style.top = ( i + 1 ) * ( _this.size.h ) + 'px'
			el.style.left = 0
			el.style.width = _this.size.w
			el.style.marginLeft = 0
			el.style.transform = 'none'
			el.style.transitionDelay = 0

		@opened = true
		return

	close: ->
		_this = @
		classie.toggle(@drop, 'cd-active')
		@positioning( true )
		@opened = false
		return

	init: ->
		@layout()
		@initEvents()
		return

includePaths = ->
	dropdownPaths = path.join(__dirname, 'styl');
	dropdownPaths

module.exports = {
	Dropdown

	includePaths: includePaths()

	with: ->
		paths  = Array.prototype.slice.call(arguments)
		result = [].concat.apply(includePaths(), paths)
		result
}