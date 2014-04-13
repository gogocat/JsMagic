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

// test
// sample count function
function count(number) {
	var num = number,
		counted = 0;
	// Start timing now
	console.log("counting...");
	while (counted < num) {
		counted +=1;
	}
	return counted;
}

// covert count function to become Asyn function
var asynCount = createAsyncFn(count);

// set 100000 count then display number counted
asynCount(100000).then(function(arg){
	console.log("...then i have counted...", arg)
});
// this line should run first
console.log("should run first...");

// undo to get back original function
asynCount("undo")(500);