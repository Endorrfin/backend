// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

setTimeout(() => console.log('Timeout'), 0);


// ------------ fibonacci I - the most nonoptimal way ------------
function fibonacci(n) {
  if (n === 0 || n === 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(fibonacci(10));
console.log(fibonacci(40));
// console.log(fibonacci(100));
// console.log(fibonacci(100000));
