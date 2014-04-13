/*
// require jq_asyncFn.js
*/

// test
// sample count function
function count(number) {
	var num = number,
		counted = 0;
	// Start timing now
	console.log("counting...");
	while (counted < num) {
		counted +=1;
	}
	return counted;
}

// covert count function to become Asyn function
var asynCount = createAsyncFn(count);

describe("asynCount", function() {
	it("should be an function", function() {
		expect(typeof asynCount).toEqual("function");
	});
});

describe("asynCount", function() {
	var myAsynCounter,
		counted;
	
	beforeEach(function(done) {
		myAsynCounter = asynCount(10000000).then(function(arg){
			console.log("...then i have counted...", arg);
			counted = arg;
			done();
		});
	});
	
	it("should has promise.then function", function () {
		expect(typeof myAsynCounter.then).toBe("function");
	});
	
	it("should make a asyn count", function (done) {
		expect(counted).toEqual(10000000);
		done();
	});
	
	// this line should run first
	console.log("This line should show first...");

	// undo to get back original function
	// asynCount("undo")(500);
});


describe("asynCount undo", function() {
	var counted;
	
	it("should count without asyn", function () {
		counted = asynCount("undo")(50000);
		expect(counted).toEqual(50000);
	});
	
	it("should not has promise.then function", function () {
		expect(counted.then).toBe(undefined);
	});

});