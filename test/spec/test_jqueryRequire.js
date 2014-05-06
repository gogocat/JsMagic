/*
// require jqueryRequire.js
*/

alert("This test must be run under web server. Script is referencing as 'http://localhost/JsMagic/require/modules/hello.js'");

var host = 'http://' + window.location.host,
	sayNameFn,
	excuted;


describe("jqueryRequire test", function() {

	it("should be a function", function() {
		expect(typeof require).toBe("function");
	});
	
	it("should load script synchronously", function() {
		var myModule = require(host + '/JsMagic/require/modules/hello.js');
		expect(typeof myModule).toBe("object");
		expect(typeof myModule.init).toBe("function");
	});
	
	// Asynchronous test
	beforeEach(function(done) {
		var helloModule = require(host + '/JsMagic/require/modules/sayName.js', function(sayName) {
			excuted = true;
			sayNameFn = sayName;
			done();
		});
	});
	
	it("should load script Asynchronously", function(done) {
		expect(excuted).toBe(true);
		expect(typeof sayNameFn).toBe("function");
		done();
	});
	
	it("should has cached modules in winodw.$r_cache", function() {
		expect(typeof window.$r_cache).toBe("object");
		expect(window.$r_cache.hasOwnProperty(host + '/JsMagic/require/modules/hello.js')).toBe(true);
		expect(window.$r_cache.hasOwnProperty(host + '/JsMagic/require/modules/sayName.js')).toBe(true);
	});

});