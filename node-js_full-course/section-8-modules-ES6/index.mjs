// console.log(module);
// console.log(require);
// console.log(arguments.callee.toString());

import { season, temperature } from './named-exports.mjs';
import { humidity, isRaining } from './inline-exports.mjs';
import usersArray from './users.mjs';
import getPosts from './utils.mjs';
import getUsersFromServer from './default-export.mjs';

import DEFAULT_SERVER, { PASSWORD as MY_PASSWORD, USERNAME as MY_USERNAME } from './mixed-exports.mjs';


console.log(season);
console.log(temperature);

console.log(isRaining);
console.log(humidity);

console.log(usersArray);


getPosts('https://jsonplaceholder.typicode.com/posts/1')
	.then((posts) => console.log(posts))
	.catch((error) => console.error(error));


getUsersFromServer('https://jsonplaceholder.typicode.com/users/2')
	.then((users) => console.log(users))
	.catch((error) => console.error(error));


console.log(DEFAULT_SERVER);
console.log(MY_USERNAME, MY_PASSWORD);
