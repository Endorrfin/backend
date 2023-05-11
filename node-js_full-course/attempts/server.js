const http = require('http');

const server = http.createServer((req, res) => {
	console.log(req);
	res.end('Greetings from the HTTP serve!');
});

server.listen(5000, () => {
	console.log(`Server was launched on port 3000`);
});
