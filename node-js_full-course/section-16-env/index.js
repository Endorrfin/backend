// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env);

console.log(require('dotenv'));

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_URL);
