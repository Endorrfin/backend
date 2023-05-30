// import stream from 'stream';
import { Transform } from 'stream';
import fs from 'fs';

// console.log(process);


// Pipe to file
const filePath = './files/stdin-dump.txt';
const writeStream = fs.createWriteStream(filePath);
process.stdin.pipe(writeStream);


// Pipe to stdout
// process.stdin.pipe(process.stdout);
// process.stdin.pipe(process.stderr);

const upperCaseStream = new Transform({
	transform: function(chunk, encoding, cb) {
		const upperCased = chunk.toString().toUpperCase();
		// console.log(upperCased);


		cb(null, upperCased);
	}
});


const reverseStream = new Transform({
	transform(chunk, encoding, callback) {
		// const reversed = chunk.toString().split('').reverse().join('');
		const arrayOfChars = chunk.toString().split('');
		const lastChar = arrayOfChars.pop();
		const reversed = arrayOfChars.reverse().concat(lastChar).join('');
		callback(null, reversed);
	}
});

process.stdin
	.pipe(upperCaseStream)
	.pipe(reverseStream)
	.pipe(process.stdout);
