// import {characters, greet} from './characters.mjs';
// import * as char from './characters.mjs'
// import log from './characters.mjs'
// import log, { characters, greet } from './characters.mjs'
// import log, * as char from './characters.mjs'
// import log, { characters, greet as hello } from './characters.mjs'


// // OPTION I
// for (const c of characters) {
//     hello(c);
// }

// // OPTION II
// for (const c of char.characters) {
//     char.greet(c);
// }

// log();


// // OPTION III
async function main() {
    try {
        const { characters, greet } = await import('./characters.mjs')
        for (const c of characters) {
            greet(c);
        }
    } catch (e) {
        console.log('Some error');
    }
}

main();
