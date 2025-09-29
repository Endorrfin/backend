const http = require('http');

const port = 4080;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
  const data = {message: '🙋‍♂️ Greetings! 👋'};

  res.setHeader('Content-type', 'application/json');
  res.setHeader('Connection', 'close');
  res.statusCode = 200;
  res.end(JSON.stringify(data));
});


server.listen(port, hostname, () => {
  console.log(`Server running at: http://${hostname}:${port}`);
});
