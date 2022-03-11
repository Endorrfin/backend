// ======= WORKER THREADS =======

const crypto = require('crypto');
const https = require('https');
const start = performance.now();

// // Увеличиваем threadPool до 8
// process.env.UV_THREADPOOL_SIZE = 8;
//
// for(let i = 0; i < 50; i++) {
//     crypto.pbkdf2('test', 'salt', 100000, 64, 'sha512', () => {
//         console.log(performance.now() - start);
//     });
// }




// for (let i = 0; i < 50; i++) {
//     https.get('https://yandex.ru', (res) => {
//         res.on('data', () => { });
//         res.on('end', () => {
//             console.log(performance.now() - start);
//         });
//     });
// }


// ======= USE WORKER THREADS =======
const factorial = require('./factorial');


const compute = (array ) => {
    const arr = [];
    for (let i = 0; i < 10000000; i++) {
        arr.push(i * i);
    }
    return array.map(el => factorial(el))
};

const main = () => {
    performance.mark('start');
    const result = [
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50]),
        compute([25, 20, 19, 48, 30, 50])
    ];
    console.log(result);

    performance.mark('end');
    performance.measure('main', 'start', 'end');

    // RESULT
    console.log(performance.getEntriesByName('main').pop());
};

setTimeout(() => {
    console.log('Timeout');
}, 2000)

main();











