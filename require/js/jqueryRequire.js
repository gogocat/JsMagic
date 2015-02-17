/*
//	require script loader
//	require jQuery
//	@uri - script location
//	@callback - callback function for Asynchronous load script
*/
var require = (function(){
	"use strict";
	var $r_cache = {};

	return function (uri, callback) {
		var isAsync = (typeof callback === "function") ? true : false,
			cache = $r_cache,
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
				closureFnText,
				source;
			if (responseText) {	
				closureFnText = '"use strict";\n var module = {}, exports = {}; \n';
				closureFnText += responseText;
				closureFnText += '\n if(!module.exports) module.exports = exports; \n module.id = "'+ uri +'";';
				closureFnText += '\n return module.exports; \n //# sourceURL='+ uri;
				closureFn = new Function(closureFnText);
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