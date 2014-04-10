/*
//	Use valueOf to make function call using operator!
//	Reference:
//	http://www.2ality.com/2011/12/fake-operator-overloading.html
//	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
*/

function CrazyFn(fn){
	this.fn = fn;
}
CrazyFn.prototype.valueOf = function () { 
	return this.fn();
};


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


// Another way to do overload - using decorated closure.
var deco = function() {
	return (function(args) {
		var argsArray = args,
			argsLength = argsArray.length,
			i;
		
		return function() {
			for (i=0; i < argsLength; i++) {
				if (typeof argsArray[i] === "function") {
					argsArray[i].call(null, arguments[i]);
				}
			}
		};
	}(Array.prototype.slice.call(arguments)));
};

// Let's test!

var fn1 = function(arg) {
	console.log("fn1: ", arg);
};
var fn2 = function(arg) {
	console.log("fn2: ", arg);
};
var fn3 = function(arg) {
	console.log("fn3: ", arg);
};

// add fn1,fn2,fn3 into mySump
var mySumup = deco(fn1, fn2, fn3);
// should run as fn1(1), fn2(2), fn3(3)
mySumup(1,2,3); 

// make another one, this time add fn2, fn1
var mySumup2 = deco(fn2, fn1);

// test again - each deco function has its own scope
mySumup2(2,1);
mySumup(1,2,3); 



