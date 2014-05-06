/*
// require jqueryRequire.js
*/

alert("This test must be run under web server. Script is referencing to site root '/'");

describe("require", function() {

	it("should be a function", function() {
		expect(typeof require).toBe("function");
	});
	
	it("should load script synchronously", function() {
		var myModule = require('/require/modules/hello.js');
			
		expect(typeof myModule).toBe("object");
		expect(typeof myModule.init).toBe("function");
	});

});