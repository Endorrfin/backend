console.log('A');


process.nextTick(() => {
  console.log('B-0');
}, 1000);

setTimeout(() => {
  console.log('B-1');
}, 1000);

setTimeout(() => {
  console.log('B-2');
}, 0);


console.log('C');
console.log('D');
console.log('E');
