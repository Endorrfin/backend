const http = require('node:http');
const fs = require('node:fs/promises');

const serverLegacy = http.createServer();

serverLegacy.on('request', async (request, response) => {
  // console.log(request.url);
  // console.log(request.method);

  if (request.url === '/' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/html');

    const fileHandle = await fs.open('./public/index.html', 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);
  }

  if (request.url === '/style.css' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/css');

    const fileHandle = await fs.open('./public/style.css', 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);
  }

  if (request.url === '/script.js' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/javascript');

    const fileHandle = await fs.open('./public/script.js', 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);
  }

  if (request.url === '/login' && request.method === 'POST') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;

    const body = {
      message: '🏃‍♂️‍➡️ Logging you in...',
    };

    response.write(JSON.stringify(body));
  }

  if (request.url === '/user' && request.method === 'PUT') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 401;

    const body = {
      message: '🧑‍🦱 Updating your info...',
    };

    response.write(JSON.stringify(body));
  }

  // Upload route
  if (request.url === '/upload' && request.method === 'POST') {
    const fileHandle = await fs.open('./storage/image.jpg', 'w');
    const fileStream = fileHandle.createWriteStream();
    response.setHeader('Content-Type', 'application/json');

    request.pipe(fileStream);

    request.on('end', () => {
      response.end(JSON.stringify({message: '✅ File was uploaded successfully!'}));
    })
  }



});

serverLegacy.listen(7000, () => {
  console.log('👐 Web server is live at http://localhost:9000.');
});
