// const fs = require("fs");
//
// const content = fs.readFileSync("./text.txt");
//
// console.log(content.toString("utf-8"));


// ******* Promise API *******
const fs = require('fs/promises');

(async () => {
  try {
    await fs.copyFile('file.txt', 'copied-promise.txt');
  } catch (error) {
    console.error(error);
  }
})();



// ******* Callback API *******
const fs = require('fs');

fs.copyFile('file.txt', 'copied-callback.txt', (error) => {
  if (error) logger.error(error);
});




// ******* Synchronous API *******
const fs = require('fs');

fs.copyFileSync('file.txt', 'copied-sync.txt');

