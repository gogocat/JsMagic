/*
//	createAsyncFn - factory to decorate an non-async function to be asyn function
//	require jQuery
//	@fn - function to be decorated
//	@context - context to be called on fn
//	return new decorated function
*/
function createAsyncFn(fn, context) {
	"use strict";
	var DecoratedFn = function(fn, context) {
		var originalFn = fn;
		return function() {
			var deferred = $.Deferred(),
				arg = Array.prototype.slice.call(arguments, 0);
			if (arg[0] === "undo") {
				return originalFn;
			}
			setTimeout(function() {
				deferred.resolve(originalFn.apply(context,arg));
			},0);
			return deferred.promise();
		};
	};
	return new DecoratedFn(fn, context || null);
}
