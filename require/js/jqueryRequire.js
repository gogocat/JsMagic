/*
//	require script loader
//	require jQuery
//	@uri - script location
//	@callback - callback function for Asynchronous load script
*/
var require = (function(){
	"use strict";
	window.$r_cache = window.$r_cache || {};

	return function (uri, callback) {
		var isAsync = (typeof callback === "function") ? true : false,
			cache = window.$r_cache,
			request,
			wrapScript,
			ret;
		
		if (typeof uri !== "string") {
			throw  "script url is undefined";
		}
		
		if (cache[uri]) {
			if (isAsync) {
				return callback(cache[uri]);
			}
			return cache[uri];
		}
		
		wrapScript = function(responseText) {
			var closureFn,
				source;
			if (responseText) {		
				closureFn = new Function('"use strict";\n var exports = {};\n' + responseText + '\n return exports; \n //# sourceURL='+ uri +'');
				cache[uri] = source = closureFn(); // Make the closureFn
				return source;
			} else {
				return null;
			}
		};

		request = $.ajax({
			url: uri,
			type: 'GET',
			dataType: "script",
			async: isAsync,
			cache:true,
			dataFilter: wrapScript,
			success: function(closureFn) {
				if(!typeof closureFn === "function") {
					return;
				}
				if (isAsync) {
					callback(closureFn);
				} else {
					ret = closureFn;
				}
			}
		});
		return (isAsync) ? request : ret;
	};
}());