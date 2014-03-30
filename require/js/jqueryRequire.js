/*
//
*/
function require(uri, callback) {
	var isAsync = false,
		request,
		ret;
	if(typeof uri !== "string") {
		throw  "uri is underline";
	}
	if(typeof callback === "function") {
		isAsync = true;
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
				closureFn = new Function('var exports = {};\n' + response.responseText + '\n return exports;'); // for trapping the loaded script scope
				//console.log(closureFn.toString()); // DEBUG print out closureFn
				ret = closureFn(); // Make the closureFn
				if (callback) {
					callback(ret);
				}
			}
		}
	});
	if (isAsync) {
		ret = request;
	}
	return ret;
}