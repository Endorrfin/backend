// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

setTimeout(() => console.log('Timeout'), 0);


// ------------ fibonacci II - the more optimal way ------------
function fibonacci(n) {
  return new Promise((resolve, reject) => {
    if (n === 0 || n === 1) {
      return resolve(n);
    }
    Promise.all([fibonacci(n - 1), fibonacci(n - 2)])
        .then(([fib1, fib2]) => resolve(fib1 + fib2))
  })
};

fibonacci(12).then((res) => console.log(res));
