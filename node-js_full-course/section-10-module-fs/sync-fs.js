const fs = require('fs');

// NOT RECOMMEND
// Avoid using sync versions! They block event loop!
try {
	fs.writeFileSync('./third.txt', 'Third file text');
	console.log('File third.txt was written');
	fs.appendFileSync('./third.txt', '\nThird more line');
	console.log('Appended text to the third.txt file');
	fs.renameSync('./third.txt', './renamed-third.txt');
	console.log('File was renamed');
} catch(error) {
	console.log(error);
}









