/*
//	require script loader
//	require jQuery
//	if environment is Node js it will do nothing.
//	@uri - script location
//	@callback - callback function for Asynchronous load script
*/
(function($, env) {
	"use strict";
	var isNode = (env !== window && typeof module !== "undefined" && module.exports),
		supportAmd = (typeof env.define === "function" && env.define.amd),
		onFail,
		require,
		cache = {};
		
	if (isNode) {
		return;
	}
		
	require = function (uri, callback) {
		var isAsync = (typeof callback === "function") ? true : false,
			dependenceList = [],
			deferreds = [],
			fetch,
			request,
			wrapScript,
			ret;
		
		if (typeof uri === "string") {
			dependenceList.push(uri);
		} else if ($.isArray(uri)) {
			dependenceList = uri;
		}

		wrapScript = function(responseText, dataType) {
			var closureFn,
				closureFnText,
				source;
				
			//TODO: consider support AMD.
			// static analysis to wrap script as AMD module.
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

		fetch =function(url) {
			return $.ajax({
				url: uri,
				type: 'GET',
				dataType: "script",
				async: isAsync,
				cache:true,
				crossDomain: false,
				dataFilter: wrapScript
			});
		};
		
		request = function(url) {
			var dfd = $.Deferred();
			if (cache[uri]) {
				dfd.resolve(cache[uri]);
			} else {
				fetch(url).done(function(closureFn){
					dfd.resolve(closureFn);
				}).fail(onFail);
			}
			return dfd.promise();
		};
		
		$.each(dependenceList, function(index, value){
			deferreds.push(
				request(value);
			);
		});
		
		$.when.apply($, deferreds).done(callback).fail(onFail);
		
		//return (isAsync) ? request : ret;
	};
	
	onFail = function() {
		console.log("fail: ", arguments);
	};
	
	env.require = require;

}(jQuery, this));