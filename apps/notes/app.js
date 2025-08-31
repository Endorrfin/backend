// const fs = require('fs');
const fs = require('node:fs');
const yargs = require('yargs');

const notes = require('./notes');
// const getNotes = require('./notes/getNotes');
const msg = getNotes();
// console.log(msg)


fs.writeFileSync('notes.txt', '✅ This file named "notes" was created by Node.js 🎯!');

// const command = process.argv[2];

// console.log(process.argv);

// if (command === 'add') {
//   console.log('🟢 Adding note!');
// } else if (command === 'remove') {
//   console.log('🔴 Removing note!');
// }


// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    }
  },
  handler: function (argv) {
    console.log('Adding a new note!', argv);
  }
})


// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove note',
  handler: function () {
    console.log('Removing the note');
  }
})


// Create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler: function () {
    console.log('Reading a note');
  }
})


// Create read command
yargs.command({
  command: 'read',
  describe: 'Create a notes',
  handler: function () {
    console.log('Listing out all note');
  }
})

console.log(process.argv);
console.log(yargs.argv);


