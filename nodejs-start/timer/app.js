
// const start = performance.now();
//
// setTimeout(() => {
//     console.log(performance.now() - start);
//     console.log('Прошла секунда')
// }, 1000)
//
//
// function myFunc(arr) {
//     console.log(`Argument => ${arr}`);
// }
//
// setTimeout(myFunc, 1500, 'Cool');
//
// const timerId = setTimeout(() => {
//     console.log('BOOM!')
// }, 5000);
//
// setTimeout(() => {
//     clearTimeout(timerId);
//     console.log('Cleared!')
// }, 1000);


// const intervalId = setInterval(() => {
//     console.log(performance.now());
// }, 1000);
//
// setTimeout(() => {
//     clearInterval(intervalId);
//     console.log('Cleared interval!')
// }, 5000);


// console.log('Before');
//
// setImmediate(() => {
//     console.log('After all')
// });
//
// console.log('After');


// const timerId = setTimeout(() => {
//     console.log('BOOM!')
// }, 5000);
//
// timerId.unref();
//
// setImmediate(() => {
//     timerId.ref();
// });



// EXAMPLES OF WORK EVENT LOOP

const fs = require('fs');

console.log("Init");

setTimeout(() => {
    console.log(performance.now(), 'Timer 0')
}, 100);

setImmediate(() => {
    console.log('Immediate');
});

fs.readFile(__filename, () => {
    console.log('File readed');
});

setTimeout(() => {
    for (let i = 0; i < 100000000; i++) {
    }
    console.log('Done')
}, 0);

setTimeout(() => {
    for (let i = 0; i < 100000000; i++) {
    }
    Promise.resolve().then(() => {
        console.log('Promise inside Timeout');
    });
    process.nextTick(() => console.log('tick inside Timeout'));
}, 0);

Promise.resolve().then(() => {
    console.log('Promise')
});

process.nextTick(() => console.log('tick'));

console.log('Final');















