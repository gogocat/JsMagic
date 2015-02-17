
var name = "This is Module B";

function getModuleName() {
	return name;
}

module.exports = {
	getModuleName: getModuleName
};
