const chalk = require('chalk');


const greenMsg = chalk.bold.green('Success!');
const greenBlackMsg = chalk.green.inverse.bold('Success!');
const orangeMsg = chalk.hex('#FF8800').bold('Warning!');
const redMsg = chalk.red.inverse.bold('Error!');
console.log(greenMsg);
console.log(orangeMsg);
console.log(greenBlackMsg);
console.log('❌ Error', redMsg);
