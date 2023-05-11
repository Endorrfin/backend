const path = require('path');

const filePath = '/Users/vk/i-data/src/backend/node-js_full-course/section-12-module-path/index.js';
const textFilePath = '/Users/vk/Desktop/temp/file.txt';
const relativePath = './section-12-module-path/movie.mov';
const directoryPath = './node-js_full-course/subfolder';


console.log(path.isAbsolute(filePath)); // true
console.log(path.isAbsolute(relativePath)); // false

console.log(path.basename(filePath)); // index.js
console.log(path.basename(directoryPath)); // subfolder

console.log(path.dirname(filePath)); // /Users/vk/i-data/src/backend/node-js_full-course/section-12-module-path
console.log(path.dirname(directoryPath)); // ./section-12-module-path

console.log(path.resolve(relativePath)); // /Users/vk/i-data/src/backend/node-js_full-course/section-12-module-path/section-12-module-path/movie.mov

console.log(path.extname(textFilePath)); // .txt
console.log(path.extname(relativePath)); // .mov
console.log(path.extname(directoryPath)); // ''

console.log(path.parse(filePath));


const parsedPath = path.parse(filePath);
console.log(filePath);
console.log(path.join(parsedPath.dir, `renamed-${parsedPath.name}.mjs`)); // /Users/vk/i-data/src/backend/node-js_full-course/section-12-module-path/renamed-index.mjs


// console.log('---> module <---', module);
// console.log('---> filename <---', __filename);
// console.log('---> dirname <---', __dirname);
