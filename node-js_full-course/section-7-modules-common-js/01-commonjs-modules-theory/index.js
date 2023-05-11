const getData = require('./utils')

console.log(arguments.callee.toString())
console.log('Developer')

console.log('---> module <---', module)
console.log('---> filename <---', __filename)
console.log('---> dirname <---', __dirname)

console.log('---> exports <---', exports)
console.log('---> module.exports <---', module.exports)
console.log(exports === module.exports)
console.log('---> require <---', require)


// ----------------- GET DATA -----------------


getData('https://jsonplaceholder.typicode.com/posts')
	.then((posts) => console.log(posts))
	.catch((error) => console.error(error))

