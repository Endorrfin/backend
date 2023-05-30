import fs from 'fs';
import path from 'path';

// INFORMATION
// rmSync - remove directory
// mkdirSync - create directory
// mkdirSync - create directory
// readdir - read all files in the directory

// method pipe - перенаправлення потоків


const sourceDir = './files';
const destinationDir = './copied-files';

if(!fs.existsSync(sourceDir)) {
	console.log(`Source dir ${sourceDir} doesn't exist!`);
	console.log('Exiting');
	process.exit(0);
}

if(fs.existsSync(destinationDir)) {

	// // if there are no files in the folder.
	// fs.rmdirSync(destinationDir);

	// if there are any files in the folder
	fs.rmSync(destinationDir, { recursive: true, force: true });
	console.log('Destination dir removed');
}

fs.mkdirSync(destinationDir);


fs.readdir(sourceDir, (err, fileNames) => {
	if(err) {
		console.log(err);
		process.exit(1);
	}
	console.log(fileNames);

	console.log('Start', performance.now());
	fileNames.forEach((fileName, index) => {
		const sourceFilePath = path.join(sourceDir, fileName);
		const destinationFilePath = path.join(destinationDir, `${index + 1}. ${fileName}`);
		// 1. index.html

		const readFileStream = fs.createReadStream(sourceFilePath);
		const writeFileStream = fs.createWriteStream(destinationFilePath);

		readFileStream.pipe(writeFileStream);

		writeFileStream.on('finish', () => {
			console.log(`File ${fileName} was copied`);
		});
	});
	console.log('End', performance.now());

});

