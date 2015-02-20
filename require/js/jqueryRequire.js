/*
//	require script loader
//	require jQuery
//	if environment is Node js it will do nothing.
//	@uri - script location
//	@callback - callback function for Asynchronous load script
*/
(function(env) {
	"use strict";
	var isNode = (env !== window && typeof module !== "undefined" && module.exports),
		supportAmd = (typeof env.define === "function" && env.define.amd),
		require,
		cache = {};
		
	if (isNode) {
		return;
	}
		
	require = function (uri, callback) {
		var isAsync = (typeof callback === "function") ? true : false,
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
		
		wrapScript = function(responseText, dataType) {
			var closureFn,
				closureFnText,
				source;
			//console.log("dataType: ", dataType);
			if (responseText) {	
				closureFnText = '"use strict";\n var module = {}, exports = {}; \n';
				closureFnText += responseText;
				closureFnText += '\n if(!module.exports) module.exports = exports; \n module.id = "'+ uri +'";';
				closureFnText += '\n return module.exports; \n //# sourceURL='+ uri;
				closureFn = new Function(closureFnText);
				cache[uri] = source = closureFn(); // Make the closureFn
				return source;
			} 
			return null;
		};

		request = $.ajax({
			url: uri,
			type: 'GET',
			dataType: "script",
			async: isAsync,
			cache:true,
			crossDomain: false,
			dataFilter: wrapScript,
			success: function(closureFn) {
				if(!closureFn) {
					return;
				}
				if (isAsync) {
					callback(closureFn);
				} else {
					ret = closureFn;
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				throw errorThrown;
			}
		});
		
		return (isAsync) ? request : ret;
	};
	
	env.require = require;

}(this));