/*
//	Use valueOf to make function call using operator!
//	Reference:
//	http://www.2ality.com/2011/12/fake-operator-overloading.html
//	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
*/

function CrazyFn(fn){
	this.fn = fn;
}
CrazyFn.prototype.valueOf = function () { 
	return this.fn();
};



// Another way to do overload - using decorated closure.
var deco = function() {
	return (function(args) {
		var argsArray = args,
			argsLength = argsArray.length,
			i,
			ret = 0;
		
		return function() {
			for (i=0; i < argsLength; i++) {
				if (typeof argsArray[i] === "function") {
					ret += argsArray[i].call(null, arguments[i]);
				}
			}
			return ret;
		};
	}(Array.prototype.slice.call(arguments)));
};




