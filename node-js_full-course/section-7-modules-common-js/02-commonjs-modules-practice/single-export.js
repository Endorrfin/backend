function greeting(name) {
	console.log('Hello', name);
};

console.log(__filename);

// DON'T DO THIS
// module.exports remains {}
// export = greeting;

module.exports = greeting;
