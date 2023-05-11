const http = require('http');

const PORT = 4000;

const server = http.createServer((req, res) => {
	// console.log(req);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1>Greetings from the HTTP server!</h1>');
});

server.listen(PORT, () => {
	console.log(`Server was launched on port ${PORT}`);
});
