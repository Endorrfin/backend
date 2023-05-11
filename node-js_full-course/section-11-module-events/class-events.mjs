import { EventEmitter } from 'events';


class Post extends EventEmitter {

	constructor(author, text) {
		super();
		this.author = author;
		this.text = text;
		this.likesQty = 0;
	}

	like(username) {
		this.likesQty += 1;
		this.emit('likePost', username);
	}
}


const myPost = new Post('Vasyl', 'My great post!');
myPost.on('likePost', (username) => {
	console.log(`${username} liked you post! `);
});

// console.log(myPost.author);
// console.log(myPost.text);
// console.log(myPost.likesQty);

myPost.like('Julia');
setTimeout(() => myPost.like('Leonid'), 1000);
setTimeout(() => myPost.like('Bob'), 2000);
// console.log(myPost.likesQty);
