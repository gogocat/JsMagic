/*
// require valuOf.js
*/

var addCoffee = new CrazyFn(function(){
	var coffeePrice = 3;
	console.log("add one coffee...");
	return coffeePrice;
});
var addSugar = new CrazyFn(function(){
	var sugarPrice = 1;
	console.log("add one sugar...");
	return sugarPrice;
});
var addMilk = new CrazyFn(function(){
	var milkPrice = 1;
	console.log("add one milk...");
	return milkPrice;
});

var cappuccino = function() {
	return addCoffee + addMilk + addMilk + addSugar;
};

// dummy functions
var fn1 = function(arg) {
	console.log("fn1: ", arg);
	return arg;
};
var fn2 = function(arg) {
	console.log("fn2: ", arg);
	return arg;
};
var fn3 = function(arg) {
	console.log("fn3: ", arg);
	return arg;
};


describe("cappuccino", function() {
	it("addCoffee should be instance of CrazyFn", function() {
		expect(addCoffee instanceof CrazyFn).toBe(true);
	});
	it("addSugar should be instance of CrazyFn", function() {
		expect(addCoffee instanceof CrazyFn).toBe(true);
	});
	it("addMilk should be instance of CrazyFn", function() {
		expect(addCoffee instanceof CrazyFn).toBe(true);
	});
});

describe("cappuccino", function() {
	var cap = cappuccino();
	it("should return total cost of cappuccino", function() {
		expect(typeof cap).toBe("number");
	});
	console.log("cappuccino cost: ", cap);
});


describe("deco - method overload using decorated closure", function() {
	var mySumup = deco(fn1, fn2, fn3),
		ret = mySumup(1,2,3); 
	
	it("deco should be a function", function() {
		expect(typeof deco).toBe("function");
	});
	
	it("mySumup should be a function", function() {
		expect(typeof deco).toBe("function");
	});
	
	it("call mySumup with parameters should match ", function() {
		expect(typeof ret).toBe("number");
		expect(ret).toBe(6);
	});
	console.log(ret);
});