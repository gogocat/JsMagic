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
		var isAsync = (typeof callback === "function"),
			dependenceList = [],
			deferreds = [],
			fetch,
			request,
			wrapScript,
			ret;
		
		if ($.isArray(uri)) {
			if (!isAsync) {
				throw "Callback function is undefined";
			}
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

		fetch =function(uri) {
			var ajaxOptions = {
				url: uri,
				type: 'GET',
				dataType: "script",
				async: isAsync,
				cache:true,
				crossDomain: false,
				dataFilter: wrapScript
			},
			onSuccess = function(closureFn) {
				if(!closureFn) {
					return;
				}
				ret = closureFn;
			};
			if (!isAsync) {
				ajaxOptions.success = onSuccess;
			}
			return $.ajax(ajaxOptions);
		};
		
		request = function(uri) {
			var dfd = $.Deferred();
			if (cache[uri]) {
				dfd.resolve(cache[uri]);
			} else {
				fetch(uri).done(function(closureFn){
					dfd.resolve(closureFn);
				}).fail(onFail);
			}
			return dfd.promise();
		};
		
		if (isAsync) {
			$.each(dependenceList, function(index, value){
				deferreds.push(
					request(value);
				);
			});
			// TODO: move this to another function
			$.when.apply($, deferreds).done(callback).fail(onFail);
		} else {
			if (cache[uri]) {
				ret = cache[uri];
			}
			fetch(uri);
		}
		return (isAsync) ? request : ret;
	};
	
	onFail = function() {
		console.log("fail: ", arguments);
	};
	
	env.require = require;

}(jQuery, this));