JsMagic
=======

Bring magic into Javascript. Make things impossible to do in native Javascript become possible!

This is a experimental project for Javascript developers to share ideas.

The goal is not to achieve or create anything special. It is aim to kick start passionate developer's idea and learn through deep thinking and research javaScript language in order to create 'Magic'.

What 'Magic' means here
----

A simple example of JavaScript magic is Memorise function.
Normally a JavaScript function get called and forget scope inside the function.
Memorise function can 'remember' things.

```javascript
var addToCart = (function() {
	var itemsNum = 0;
	return function(num) {
	   if (!num) {
	       return itemsNum;
	   }
	   if (typeof num === 'number') {
		return itemsNum += num;
	   }
	};
}());

addToCart(1);
addToCart(1);
console.log('total: ' + addToCart());
```

Other interesting (hardcore) magic are:
- Dependency injection (named parameters)in Angular JS <a href="http://www.alexrothenberg.com/2013/02/11/the-magic-behind-angularjs-dependency-injection.html" target="_blank">explain here</a>
- Two way data binding
- Promise

You are very welcome to share any idea. No magic too simple or small.

License
----

BSD