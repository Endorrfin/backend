const express = require('express');

const app = express();

const firstHandler = (req, res, next) => {
	console.log('first handler');
	// res.send('First handler -> Response from Express');
	next();
};

const secondHandler = (req, res) => {
	console.log('second handler');
	// res.send('Second handler -> Response from Express');
	res.send('Response from Express');
};

app.get('/', firstHandler, secondHandler);

app.listen(3003, () => console.log('Server was started on port 3003'));
