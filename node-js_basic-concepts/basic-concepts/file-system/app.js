const fs = require('fs');


// fs.readFile('./file-system/test.txt', 'utf8', (error, data) => {
//
//   fs.mkdirSync('./file-system/files', () => {});
//
//   fs.writeFileSync('./file-system/files/test4.txt', `${data} + version` + new Date(), () => {
//     error ? console.log(error) : null;
//   });
//
// });



setTimeout(() => {
  if (fs.existsSync('./file-system/files/test4.txt')) {
    fs.unlink('./file-system/files//test4.txt', () => {});
  }
}, 3000);


setTimeout(() => {
  if (fs.existsSync('./file-system/files')) {
    fs.rmdir('./file-system/files', () => {});
  }
}, 5000);





