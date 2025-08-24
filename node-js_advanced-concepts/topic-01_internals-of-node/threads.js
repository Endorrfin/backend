
// process.env.UV_THREADPOOL_SIZE = 2
process.env.UV_THREADPOOL_SIZE = 5
const crypto = require('crypto');

const start = Date.now();

// SECTION I
crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
  console.log('1️⃣', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
  console.log('2️⃣', Date.now() - start);
})


// SECTION II
crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
  console.log('3️⃣', Date.now() - start);
})


crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
  console.log('4️⃣', Date.now() - start);
})


crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
  console.log('5️⃣', Date.now() - start);
})
