const http = require('http');

const PORT = 3000;


const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.write('<h1>Hello from the Node.js</h1>');
	res.end();
});


// const comments = [
// 	{ id: 100, text: 'First comment', author: 'Vasyl' },
// 	{ id: 526, text: 'Second comment', author: 'Julia' },
// 	{ id: 724, text: 'Third comment', author: 'Leonid' }
// ];
//
// const server = http.createServer((req, res) => {
// 	if(req.url === '/html') {
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type', 'text/html');
// 		res.write('<html><body><div>');
// 		res.write('<h1>Greetings from the HTTP server!</h1>');
// 		return res.end('Greetings from the HTTP server!');
// 		res.write('</div></body></html>');
// 		return res.end();
// 	}
//
// 	if(req.url === '/text') {
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type', 'text/plain');
// 		return res.end('This is plain text');
// 	}
//
// 	if(req.url === '/json') {
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type', 'application/json');
// 		return res.end(JSON.stringify(comments));
// 	}
//
// 	res.statusCode = 404;
// 	res.setHeader('Content-Type', 'application/json');
// 	return res.end(JSON.stringify(comments));
// });


server.listen(PORT, () => {
	console.log(`Server was launched on port ${PORT}`);
});
