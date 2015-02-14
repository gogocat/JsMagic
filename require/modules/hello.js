
var testVar = "shouldn't see this!";

exports.init = function(arg) {
	var bodyNode = document.getElementsByTagName("body")[0],
		contentNode = document.createElement("p"),
		textNode = document.createTextNode(arg); 
	
	bodyNode.appendChild(contentNode.appendChild(textNode));
};