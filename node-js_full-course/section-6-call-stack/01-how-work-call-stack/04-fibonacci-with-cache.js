// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

setTimeout(() => console.log('Timeout'), 0);


// ------------ fibonacci IV - even more optimized way using cache ------------

const cache = new Map();
function fibonacci(n) {
  return new Promise((resolve, reject) => {
    if (n === 0 || n === 1) {
      return resolve(n);
    }

    if (cache.has(n)) {
      return resolve(cache.get(n))
    }
    setImmediate(() =>
        Promise.all([fibonacci(n - 1), fibonacci(n - 2)])
            .then(([fib1, fib2]) => {
              cache.set(n, fib1 + fib2); // n - identificator in cache
              resolve(fib1 + fib2)
            })
    )
  })
};


fibonacci(40).then((res) => console.log(res));
