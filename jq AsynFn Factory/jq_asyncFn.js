
/**
*	jq_asyncFn.js
*	@description 
*	This script provide createAsyncFn function to decorate normal function to become async with promise.
*	AMD compatible
*	@require jQuery
*	@return function createAsyncFn
*	@param fn - original function. context - context to be use on calling original function
*
*/
(function (window, factory) {
    "use strict";
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        window.createAsyncFn = factory();
    }
}(window, function () {
	"use strict";
	var hasRequestAnimationFrame = (typeof window.requestAnimationFrame === "function");
	
	// DecoratedFn object
	function DecoratedFn(fn, context) {
		var originalFn = fn;
		return function() {
			var deferred = $.Deferred(),
				arg = Array.prototype.slice.call(arguments, 0),
				resolvedFn = function() {
					deferred.resolve(originalFn.apply(context,arg));
				};
				
			if (arg[0] === "undo") {
				return originalFn;
			}
			if (hasRequestAnimationFrame){
				window.requestAnimationFrame(resolvedFn);
			} else {
				window.setTimeout(resolvedFn,0);
			}
			return deferred.promise();
		};
	}
	
	function createAsyncFn(fn, context) {
		return new DecoratedFn(fn, context || null);
	}
	
	return createAsyncFn;
}));