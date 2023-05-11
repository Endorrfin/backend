const http = require('http');

const PORT = 3000;

const comments = [
	{ id: 1, text: 'First comment', author: 'Vasyl' },
	{ id: 2, text: 'Second comment', author: 'Julia' },
	{ id: 3, text: 'Third comment', author: 'Barna' },
	{ id: 4, text: 'Fourth comment', author: 'Dilan' },
	{ id: 5, text: 'Fifth comment', author: 'Leonid' },
	{
		'id': 800,
		'text': 'New comment',
		'author': 'Leo'
	},
	{
		'id': 801,
		'text': 'One more comment',
		'author': 'Li'
	}
];

const server = http.createServer((req, res) => {
	if(req.url === '/html') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.write('<html><body><div>');
		res.write('<h1>Greetings from the HTTP server!</h1>');
		res.write('</div></body></html>');
		return res.end();
	}

	if(req.url === '/text') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		return res.end('This is plain text');
	}

	if(req.url === '/json') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		return res.end(JSON.stringify(comments));
	}

	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/html');
	return res.end('<h1>Page not found! Input correct url address please.</h1>');

});

server.listen(PORT, () => {
	console.log(`Server was launched on port ${PORT}`);
});
