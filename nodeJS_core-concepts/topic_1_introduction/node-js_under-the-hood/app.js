
const start = Date.now()
console.log('1️⃣ first');

for (let i = 0; i < 10000000000; i++) {
  // console.log('🔄 loop 1️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣');
}

console.log('🔄 loop 1️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣');
console.log('⌛️', Date.now() - start);
console.log('2️⃣ second');

