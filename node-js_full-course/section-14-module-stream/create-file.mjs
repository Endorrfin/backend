import fs from 'fs';
import path from 'path';


// How to run program: node.js <filename> <linesQty>
if(!process.argv[2] || !process.argv[3]) {
	console.log('Filename and lines qty must be supplied as arguments');
	process.exit(0);
}
console.log('Continue...');

const filename = process.argv[2];
const linesQty = parseInt(process.argv[3]);

if(isNaN(linesQty)) {
	console.log('Lines qty must be a number');
	process.exit(0);
}


const writeStream = fs.createWriteStream(path.join('./files', filename));

console.log('Start', performance.now());

for(let i = 1; i <= linesQty; i++) {
	writeStream.write(`This is a line number ${i} in the automatically generated file\n`);
}

console.log('End', performance.now());
setTimeout(() => console.log('Timeout', performance.now()), 0);

writeStream.end(() => {
	console.log(`Automatically generated file ${filename} with ${linesQty} lines was created`);
});
