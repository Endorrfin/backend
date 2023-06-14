const http = require('http');

const server = http.createServer((req, res) => {
	res.end('Response from the server');
});

server.listen(3000, () => console.log('Server was started on port 3000'));
