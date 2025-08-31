const os = require('os');







// ABOUT PC
console.log('🍎 Current Operating System', os.platform());
console.log('🏛️ Processor Architecture', os.arch());
console.info('🧠 Processor Core', os.cpus());
console.log('☝️ Number of Processor Cores', os.cpus().length);
