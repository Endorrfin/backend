const http = require('node:http');

const server = http.createServer((req, res) => {});

server.on('request', (request, response) => {

  console.log('------- METHOD: -------', request.method);
  console.log('------- URL: -------', request.url);
  console.log('------- HEADERS: -------', request.headers);

  const name = request.headers.name;

  console.log('------- BODY: -------');

  let data = '';

  request.on('data', (chunk) => {
    data += chunk.toString();
  });

  request.on('end', () => {
    data = JSON.parse(data);

    console.log('DATA', data);
    console.log('NAME', name);

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({ message: `Post with title: ${data.title} was created by 👨🏼‍💻 ${name}` }));

  });
});




server.listen(8050, () => {
  console.log('Server listening on http://localhost:8050');
});

