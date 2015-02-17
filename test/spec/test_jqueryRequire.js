/*
// require jqueryRequire.js
*/

console.log("This test must be run under web server. Script is referencing as 'http://localhost/JsMagic/require/modules/hello.js'");

var host = 'http://' + window.location.host,
	path = host + '/JsMagic/require/modules/';
	
describe("jqueryRequire test", function() {

	it("should be a function", function() {
		expect(typeof require).toBe("function");
	});
	
	it("should load script synchronously", function() {
		var myModule = require(path + 'hello.js');
		expect(typeof myModule).toBe("object");
		expect(typeof myModule.init).toBe("function");
	});
	
});

describe("Test asynchronous loading", function() {
	var sayNameFn,
		excuted;
	// Asynchronous test
	beforeEach(function(done) {
		var helloModule = require(path + 'sayName.js', function(sayName) {
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
	
	it("should not has $r_cache cached in winodw", function() {
		expect(window.$r_cache).toBeUndefined();
	});
});

/*
describe("Test asynchronous loading list of modules", function() {
	var moduleA,
		moduleB;
	// Asynchronous test
	beforeEach(function(done) {
		var finalModule = require([path + 'moduleA.js', path + 'moduleB.js'], function(a, b) {
			moduleA = a;
			moduleB = b;
			done();
		});
	});

});
*/