const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.send('Hello form Express!!!');
});

app.listen(3000);
