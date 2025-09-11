// ******* Promise API *******
const fs1 = require('fs/promises');

(async () => {
  try {
    await fs1.copyFile('file.txt', 'copied-promise.txt');
  } catch (error) {
    console.error(error);
  }
})();



// ******* Callback API *******
const fs2 = require('fs');

fs2.copyFile('file.txt', 'copied-callback.txt', (error) => {
  if (error) logger.error(error);
});




// ******* Synchronous API *******
const fs3 = require('fs');

fs3.copyFileSync('file.txt', 'copied-sync.txt');

