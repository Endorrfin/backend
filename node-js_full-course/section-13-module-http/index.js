const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
	console.log(req);
	res.statusCode = 200;
	res.end('Greetings from the HTTP server!');
});

server.listen(PORT, () => {
	console.log(`Server was launched on port ${PORT}`);
});
