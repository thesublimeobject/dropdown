var Dropdown, classie, includePaths;

classie = require('classie');

Dropdown = (function() {
  function Dropdown(el) {
    this.el = el;
  }

  Dropdown.prototype.transformSelect = function() {
    var label, optionsHTML, ul, value;
    optionsHTML = '';
    label = '';
    value = -1;
    [].forEach.call(this.el.children, function(el) {
      var classes, selectLabel, selected, val;
      val = el.getAttribute('value');
      classes = el.getAttribute('class');
      selected = el.getAttribute('selected');
      label = el.textContent;
      if (val !== -1) {
        optionsHTML += classes != null ? '<li data-value="' + val + '"><span class="' + classes + '">' + label + '</span></li>' : '<li data-value="' + val + '"><span>' + label + '</span></li>';
      }
      if (selected != null) {
        selectLabel = label;
        return value = val;
      }
    });
    this.el.insertAdjacentHTML('afterend', '<div class="cd-dropdown"></div>');
    this.drop = this.el.parentNode.querySelector('.cd-dropdown');
    ul = document.createElement('ul');
    this.drop.appendChild(ul);
    this.listofOptions = this.drop.querySelector('ul');
    this.listofOptions.innerHTML = optionsHTML;
    this.listofOptions.insertAdjacentHTML('beforebegin', '<span></span>');
    this.selectLabel = this.listofOptions.parentNode.querySelector('span');
    this.selectLabel.textContent = typeof selectLabel !== "undefined" && selectLabel !== null ? selectLabel : this.listofOptions.firstChild.firstChild.textContent;
    this.el.parentNode.removeChild(this.el);
    return value;
  };

  Dropdown.prototype.layout = function() {
    var elId, elName, inputName, value, _this;
    _this = this;
    this.zIndex = 1000;
    value = this.transformSelect();
    this.options = this.listofOptions.children;
    this.optionsCount = this.options.length;
    this.size = {
      w: this.drop.offsetWidth,
      h: this.drop.offsetHeight
    };
    elName = this.el.getAttribute('name');
    elId = this.el.getAttribute('id');
    inputName = typeof el !== "undefined" && el !== null ? elName : (elId != null ? elId : 'cd-dropdown-' + (new Date()).getTime());
    this.listofOptions.insertAdjacentHTML('beforebegin', '<input type="hidden" name="' + inputName + '" value="' + value + '"></input>');
    this.inputEl = this.drop.querySelector('input[name="' + inputName + '"]');
    this.selectLabel.style.zIndex = this.zIndex + this.optionsCount;
    this.positioning();
    setTimeout(function() {
      return [].forEach.call(_this.options, function(el) {
        el.style.transition = 'all 300ms ease-in';
      });
    }, 25);
  };

  Dropdown.prototype.positioning = function(anim) {
    var _this;
    _this = this;
    this.listofOptions.style.height = 'auto';
    return [].forEach.call(this.options, function(el, i) {
      el.style.zIndex = _this.zIndex + _this.optionsCount - 1 - i;
      el.style.top = 0;
      el.style["let"] = 0;
      el.style.marginLeft = 0;
      el.style.opacity = 1;
      return el.style.transform = 'none';
    });
  };

  Dropdown.prototype.onOptionSelect = function(opt) {
    return false;
  };

  Dropdown.prototype.initEvents = function() {
    var _this;
    _this = this;
    this.selectLabel.addEventListener('mousedown', function(event) {
      if (_this.opened) {
        _this.close();
      } else {
        _this.open();
      }
      return false;
    });
    return [].forEach.call(this.options, function(el) {
      el.addEventListener('click', function() {
        var option;
        if (_this.opened) {
          option = this;
          console.log(option);
          _this.inputEl.setAttribute('value', option.getAttribute('data-value'));
          _this.selectLabel.innerHTML = option.innerHTML;
          _this.close();
        }
      });
    });
  };

  Dropdown.prototype.open = function() {
    var _this;
    _this = this;
    classie.toggle(this.drop, 'cd-active');
    this.listofOptions.style.height = (this.optionsCount + 1) * this.size.w + 'px';
    [].forEach.call(this.options, function(el, i) {
      el.style.opacity = 1;
      el.style.top = (i + 1) * _this.size.h + 'px';
      el.style.left = 0;
      el.style.width = _this.size.w;
      el.style.marginLeft = 0;
      el.style.transform = 'none';
      return el.style.transitionDelay = 0;
    });
    this.opened = true;
  };

  Dropdown.prototype.close = function() {
    var _this;
    _this = this;
    classie.toggle(this.drop, 'cd-active');
    this.positioning(true);
    this.opened = false;
  };

  Dropdown.prototype.init = function() {
    this.layout();
    this.initEvents();
  };

  return Dropdown;

})();

includePaths = function() {
  var dropdownPaths;
  dropdownPaths = path.join(__dirname, 'styl');
  return dropdownPaths;
};

module.exports = {
  Dropdown: Dropdown,
  includePaths: includePaths(),
  "with": function() {
    var paths, result;
    paths = Array.prototype.slice.call(arguments);
    result = [].concat.apply(includePaths(), paths);
    return result;
  }
};
