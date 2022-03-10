let characters = [
    {name: 'Frodo', hasRing: false},
    {name: 'Bilbo', hasRing: false},
];

// // OPTION I
// function stealRing(characters, owner) {
//     characters.map(c => {
//         if(c.name == owner) {
//             c.hasRing = true
//         } else {
//             c.hasRing = false
//         }
//     })
// }


// OPTION II
function stealRing(characters, owner) {
    return characters.map(c => {
        if(c.name == owner) {
            c.hasRing = true
        } else {
            c.hasRing = false
        }
    })
}

console.log('Downloaded character.js');

// module.exports = {characters, stealRing};

module.exports = function log() {
    console.log('log')
}


