/*
// require cacheFn.js
*/

// test expensive function
function myFn(num) {
	var result = 0, 
		count = num || 10000;
	console.time("myFn");
	while(count-- > 0) {
		result +=1;
	}
	console.timeEnd("myFn");
	return result;
}

describe("mySuperFn", function() {
	// make myFn to be cache function
	var mySuperFn = cacheFn(myFn);

	beforeEach(function() {
		spyOn(window, 'myFn').and.callThrough();
	});
	
	it("should be an function", function() {
		expect(typeof mySuperFn).toEqual("function");
	});
	
	it("should return count value using closure fn", function() {
		var ret = mySuperFn(10000000, function(){
			var a = "a";
			return a;
		});
		expect(window.myFn).not.toHaveBeenCalled();
		expect(typeof ret).toEqual("number");
		expect(ret).toBeGreaterThan(0);
		console.log(ret);
	});
	
	it("should return value using cache", function() {
		var ret = mySuperFn(10000000, function(){
			var a = "a";
			return a;
		});
		expect(window.myFn).not.toHaveBeenCalled();
		expect(ret).toEqual(10000000);
	});
	
});

describe("mySuperFnKeepSpace", function() {
	var mySuperFnKeepSpace = cacheFn(myFn, false);
	
	beforeEach(function() {
		spyOn(window, 'myFn').and.callThrough();
	});
	
	it("should be an function", function() {
		expect(typeof mySuperFnKeepSpace).toEqual("function");
	});
	
	it("should return value not using cache", function() {
		var ret = mySuperFnKeepSpace(10000000, function(){
			var a = "a";
			return a;
		});
		expect(ret).toEqual(10000000);
	});
	
	it("should return value not using cache even parameters are same but code format different", function() {
		var ret = mySuperFnKeepSpace(10000000, function(){var a = "a";return a;});
		expect(ret).toEqual(10000000);
	});
	
	it("should return value using cache", function() {
		var ret = mySuperFnKeepSpace(10000000, function(){var a = "a";return a;});
		expect(ret).toEqual(10000000);
	});
	
});