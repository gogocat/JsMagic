
var name = "This is Module A";

function getModuleName() {
	return name;
}

module.exports = {
	getModuleName: getModuleName
};
