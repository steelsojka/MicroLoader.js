/**
 * MicroLoader.js 
 * 
 * by Steven Sojka
 *
 * https://github.com/steelsojka/MicroLoader.js
 *
 * MIT Licensed
 * 
 */
;(function(exports, window, document) {
  
  var cache;
  var isCacheSet = false;
  var MircoLoader = {};
  var config = {
    THRESHOLD : 100,
    REMOVE_CLASS : "lazy",
    ONLOAD : false,
    ONSCROLL : true
  };

  var removeListeners = function() {
    window.removeEventListener('scroll', MircoLoader.load);
  };

  var setCache = function() {
    var _cache = [];
    var i, _len;
    var elements = document.getElementsByClassName(config.REMOVE_CLASS);

    for (i = 0, _len = elements.length; i < _len; i++) {
      if (typeof elements[i] !== 'undefined') {
        _cache.push(elements[i]);
      }
    }
    isCacheSet = true;
    return _cache;
  };

  var removeClass = function(element, _class) {
    element.className = element.className.replace(_class, "").trim();
  };

  MircoLoader.set = function(setting, value) {
    var _setting = setting.toUpperCase();
    if (_setting in config) {
      return config[_setting] = value;
    }
    return false;
  };

  MircoLoader.get = function(setting) {
    var _setting = setting.toUpperCase();
    if (_setting in config) {
      return config[_setting];
    }
    return false;
  };

  MircoLoader.getConfig = function() { return config; };
  MircoLoader.getCache = function() { return cache; };
  MircoLoader.resetCache = function() { isCacheSet = false; };

  MircoLoader.load = function() {
    if (!isCacheSet) {
      cache = setCache();
    }
    if (cache.length <= 0) return;

    var i = 0, _len, image, imageTop, imageHeight, source;
    var pageYOffset = window.pageYOffset;
    var fold = pageYOffset + window.innerHeight + config.THRESHOLD;
    
    while (i < cache.length) {
      image = cache[i];
      imageTop = image.getBoundingClientRect().top + pageYOffset;

      if (imageTop < fold) {
        source = image.getAttribute('data-src');
        image.setAttribute('src', source);
        image.removeAttribute('data-src');
        removeClass(image, config.REMOVE_CLASS);
        cache.splice(i, 1);
       
        if (cache.length <= 0) {
          removeListeners();
        }
        continue;
      }
      i++;
    }
  };
  
  if (config.ONLOAD) {
    window.addEventListener('DOMContentLoaded', MircoLoader.load);
  }

  if (config.ONSCROLL) {
    window.addEventListener('scroll', MircoLoader.load); 
  }

  exports.MircoLoader = MircoLoader;

}(this, window, document));