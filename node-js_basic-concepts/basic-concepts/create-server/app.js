const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');
  // console.log('---- REQUEST', req);
  console.log(req.url, req.method);


  // res.setHeader('Content-Type', 'text/html');
  //
  // res.write('<head><link rel="stylesheet" href="#"></head>');
  //
  // res.write('<h1>Hello world!</h1>');
  // res.write('<p>My name is Vasyl</p>');
  // res.end();



  res.setHeader('Content-Type', 'application/json');

  const data = JSON.stringify([
    { name: 'Tommy', age: 35 },
    { name: 'Arthur', age: 40 },
  ])

  res.end(data);
});


server.listen(3000, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});