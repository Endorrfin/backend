// const exportedObject = require('./multiple-exports');
// const { myName, myHobbies, myFavoriteNumber } = exportedObject;

const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports');
const greetingFn = require('./single-export');

// DON"T USE ABSOLUTE PATHS
const someString = require('/Users/vk/i-data/src/backend/node-js_full-course/section-7-modules-common-js/02-commonjs-modules-practice/single-export.js');

const { myName: myOtherName, myFriendsName, myGreatHobbies } = require('./export-and-import');

// ------------ Imports from multiple-exports ------------
// console.log(exportedObject);
console.log(myName);
console.log(myHobbies);
console.log(myFavoriteNumber);

// mutates array in the multiple-exports module!
myHobbies.push('climbing');

// ------------ Imports from single-export ------------
greetingFn(myName);
console.log('-- url --', someString);


// ------------ Imports from export-and-import ------------
console.log(myOtherName);
console.log(myFriendsName);
console.log(myGreatHobbies);

