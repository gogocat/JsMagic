/*
//	require script loader
//	require jQuery
//	@uri - script location
//	@callback - callback function for Asynchronous load
*/
var require = (function(){
	"use strict";
	var $cache = {};
	
	return function (uri, callback) {
		var isAsync = (typeof callback === "function") ? true : false,
			request,
			ret;
		if(typeof uri !== "string") {
			throw  "uri is underline";
		}
		if ($cache[uri]) {
			if (isAsync) {
				callback($cache[uri]);
				return;
			} else {
				return $cache[uri];
			}
		}
		request = $.ajax({
			url: uri,
			type: 'GET',
			dataType: 'text',
			async: isAsync,
			complete: function(response) {
				var closureFn;
				// console.log(arguments); // DEBUG response object
				if (response && response.statusText === "success") {		
					closureFn = new Function('"use strict";\nvar exports = {};\n' + response.responseText + '\n return exports;'); // for trapping the loaded script scope
					//console.log(closureFn.toString()); // DEBUG print out closureFn
					$cache[uri] = ret = closureFn(); // Make the closureFn
					if (isAsync) {
						callback(ret);
					}
				} else {
					throw response.statusText;
				}
			}
		});
		return (isAsync) ? request : ret;
	};
}());