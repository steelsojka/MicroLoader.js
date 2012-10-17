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
  var MicroLoader = {};
  var config = {
    THRESHOLD        : 100,
    CLASS            : "lazy",
    SOURCE_ATTRIBUTE : "data-src",
    ONLOAD           : true,
    ONSCROLL         : true
  };

  var removeListener = function(event) {
    window.removeEventListener(event, MicroLoader.load);
  };

  var setCache = function() {
    var _cache = [];
    var i, _len;
    var elements = document.getElementsByClassName(config.CLASS);

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

  MicroLoader.set = function(setting, value) {
    var _setting = setting.toUpperCase();
    if (_setting in config) {
      return config[_setting] = value;
    }
    return false;
  };

  MicroLoader.get = function(setting) {
    var _setting = setting.toUpperCase();
    if (_setting in config) {
      return config[_setting];
    }
    return false;
  };

  MicroLoader.getConfig    = function() { return config; };
  MicroLoader.getCache     = function() { return cache; };
  MicroLoader.resetCache   = function() { isCacheSet = false; };
  MicroLoader.removeOnload = function() { removeListener('DOMContentLoaded'); };
  MicroLoader.removeScroll = function() { removeListener('scroll'); };

  MicroLoader.load = function() {
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
        source = image.getAttribute(config.SOURCE_ATTRIBUTE);
        image.setAttribute('src', source);
        image.removeAttribute(config.SOURCE_ATTRIBUTE);
        removeClass(image, config.CLASS);
        cache.splice(i, 1);
       
        if (cache.length <= 0) {
          MicroLoader.removeOnload();
          MicroLoader.removeScroll();
        }
        continue;
      }
      i++;
    }
  };
  
  if (config.ONLOAD) {
    window.addEventListener('DOMContentLoaded', MicroLoader.load);
  }

  if (config.ONSCROLL) {
    window.addEventListener('scroll', MicroLoader.load); 
  }

  exports.MicroLoader = MicroLoader;

}(this, window, document));