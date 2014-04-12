//	cacheFn(myfn);
//	@fn - original function to be decorate with cache
//	@context - optional call context.default to null
//	@ignorSpace - optional to stop remove line breaks and space in arguments object.
function cacheFn(fn, context, ignorSpace){
	return (function(fn, context, ignorSpace){
		var cache = [];
		context = context || null;
		
		return function() {
			var args = (Array.prototype.slice.call(arguments)).toString(),
				cacheLength = cache.length,
				c;
			if (ignorSpace !== false) {
				args = args.replace(/\s+|\r?\n|\r/g,"");
			}
			if (cacheLength) {
				console.time("cacheFn"); // debug time
				for (c=0; c < cacheLength; c+=1) {
					if (cache[c].args === args) {
						console.log("using cache: ", cache[c].result);
						console.timeEnd("cacheFn"); // debug timeEnd
						return cache[c].result;
					}
					console.log("no cache: ", args); // debug timeEnd
				}
			} else {
				cache.push({
					args: args,
					result: (fn.apply(context, arguments))
				});
			}
		}
	}(fn, context, ignorSpace));
};

// test expensive function
function myFn(num) {
	var result = 0, 
		count = num || 10000;
	console.time("myFn");
	while(count -- > 0) {
		result +=1;
	}
	console.timeEnd("myFn");
	return result;
}

// make myFn to be cache function
var mySuperFn = cacheFn(myFn,  false);

// make call with dummy 2nd parameter
mySuperFn(10000000, function(){
	var a = "a";
	return a;
});

// shouldn't have cache as 2nd parameter is different
mySuperFn(10000000, "x"); 

// should use cache even 2nd parameter format as inline style
mySuperFn(10000000, function(){ var a = "a"; return a; }); // this should use cache
