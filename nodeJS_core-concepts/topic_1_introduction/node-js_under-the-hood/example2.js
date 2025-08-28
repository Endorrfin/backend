
const start = Date.now();

setTimeout(() => {
  console.log('Done');
  console.log(Date.now() - start);
}, 50);

for (let i = 0; i < 1000000000; i++){}
