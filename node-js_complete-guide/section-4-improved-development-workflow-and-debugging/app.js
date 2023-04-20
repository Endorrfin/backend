const http = require('http');

const routes = require('./routes');

console.log('SOME TEXT', routes.someText);

const server = http.createServer(routes.handled);

server.listen(3000);






