const fs = require('fs/promises');

fs.writeFile('./second.txt', 'Second file text')
	.then(() => console.log('File second.txt was written'))
	.then(() => fs.appendFile('./second.txt', '\nSecond more line'))
	.then(() => console.log('Appended text to the second.txt file'))
	.then(() => fs.rename('./second.txt', './renamed-second.txt'))
	.then(() => console.log('File was renamed'))
	.catch((err) => console.error(err));







