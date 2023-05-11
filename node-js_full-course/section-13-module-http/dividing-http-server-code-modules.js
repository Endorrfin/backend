const http = require('http');
const { getHTML, getText, getComments, postComment, handleNotFound } = require('./handlers');

const PORT = 3000;

const server = http.createServer((req, res) => {
	if(req.method === 'GET' && req.url === '/html') {
		return getHTML(req, res);
	}

	if(req.method === 'GET' && req.url === '/text') {
		return getText(req, res);
	}

	if(req.method === 'GET' && req.url === '/comments') {
		// console.log('---> dividing http <--- ', getComments(req, res));
		return getComments(req, res);
	}

	if(req.method === 'POST' && req.url === '/comments') {
		return postComment(req, res);
	}

	handleNotFound(req, res);

});

server.listen(PORT, () => {
	console.log(`Server was launched on port ${PORT}`);
});

