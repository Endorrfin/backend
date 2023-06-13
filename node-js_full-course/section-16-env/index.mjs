import dotenv from 'dotenv';
// import { config } from 'dotenv';

console.log(dotenv);

dotenv.config();


console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_URL);
