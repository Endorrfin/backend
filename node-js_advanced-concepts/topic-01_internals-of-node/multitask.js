// process.env.UV_THREADPOOL_SIZE = 5
process.env.UV_THREADPOOL_SIZE =1

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https
      .request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
          console.log('1️⃣ HTTPS REQUEST', Date.now() - start);
        });
      })
      .end();
}


function doHash() {
  crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
    console.log('2️⃣ #️⃣HASH #️⃣', Date.now() - start);
  })
}


doRequest();


fs.readFile('multitask.js', 'utf8', () => {
  console.log('3️⃣ 🗂️FILE SYSTEM', Date.now() - start);
})


doHash()
doHash()
doHash()
doHash()

