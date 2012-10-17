MicroLoader.js
==============

Very small lazy image loader that is very configurable and lightweight (only 571 bytes gzipped!)

How To
------

1. Add the class "lazy" (this can be changed) to your html img tags
2. Then add the actual image path under the attribute "data-src" (this can also be changed)

The source attribute should be either blank or a 1 x 1 pixel blank image
```html
<img class="lazy" src="blankimage.png" data-src="http://mydomain.com/images/image.png">
```

THATS IT!

Advanced Options
----------------

You can access the config object by calling the getConfig method. This is also useful for seeing the options available.

```javascript
MicroLoader.getConfig();
```

By default the loader adds and eventListener on 'scroll' and 'DOMContentLoaded'. You can disable these listeners by calling these methods or modifiying the config object in the source.

```javascript
MicroLoader.removeOnload();  // Disable onload listener

MicroLoader.removeScroll(); // Disable scroll listener
```

You can set the threshold for when the loader loads the image.  It is set in pixels from the bottom of the screen.  The default is 100, which makes it so the image starts loading once it comes within 100px of the bottom of the window.

```javascript
MicroLoader.set('threshold', 250); // 250px threshold
```

The default class and source sttribute can be modifed the same way as well.

```javascript
MicroLoader.set('class', 'myLazyClass'); // Change class to search for

MicroLoader.set('source_attribute', 'data-newsrc'); // Change the source attribute
```

Most of these options must be modified before the load function is called.

```javascript
MicroLoader.load() // Manually call the load function
```

You can reset the cache if you have content that loads asynchronously.  Simply calling the resetCache method will set the isCacheSet flag to false forcing the cache to reinitialize the next time the load method is called

```javascript
MicroLoader.resetCache(); // Sets the cache next time load() is called
```

Licensed
--------
MIT Licensed