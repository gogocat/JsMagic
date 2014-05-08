//	cacheFn(myfn);
//	@fn - original function to be decorate with cache
//	@context - optional call context.default to null
//	@ignoreSpace - boolean, an optional parameter to stop remove line breaks and space in arguments.
function cacheFn(fn, ctx, ignoreSpace){
	"use strict";
	return (function(fn, ctx, ignoreSpace){
		var cache = [],
			context,
			shouldIgnoreSpace = true,
			maxCacheLength = 1000;
			
		// manipulation parameters 
		context = (typeof arguments[1] === "boolean") ? null : ctx || null;
		if (arguments[2] === undefined) {
			if (typeof arguments[1] === "boolean") {
				shouldIgnoreSpace = arguments[1];
			}
		}

		return function() {
			var args =  Array.prototype.slice.call(arguments),
				argString = args.toString(),
				addCache = function() {
					var ret;
					if (cacheLength >= maxCacheLength) {
						cache.shift();
					}
					cache.push({
						key: argString,
						result: (fn.apply(context, args))
					});
					return cache[cache.length - 1].result;
				},
				cacheLength = cache.length,
				c;
				
			if (shouldIgnoreSpace !== false) {
				argString = argString.replace(/\s+|\r?\n|\r/g,"");
			}
			if (cacheLength) {
				console.time("cacheFn"); // debug time
				for (c=0; c < cacheLength; c+=1) {
					if (cache[c].key === argString) {
						console.timeEnd("cacheFn"); // debug timeEnd
						return cache[c].result;
					}
				}
			} 
			return addCache();
		}
	}(fn, ctx, ignoreSpace));
};
