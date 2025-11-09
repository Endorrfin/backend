const http = require('http');

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent: agent,
  hostname: 'localhost',
  port: 8050,
  method: 'POST',
  path: '/create-post',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Length': Buffer.byteLength(JSON.stringify({message: '😻️ Hey you still there?'}), 'utf-8'),
    'name': 'KvN'
  },
});


// This event is emitted only ones
request.on('response', (response) => {
  console.log('------- STATUS: -------', response.statusCode);
  console.log('------- HEADERS: -------', response.headers);

  console.log('------- BODY: -------');
  response.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
  });

  response.on('end', () => {
    console.log('🤷‍♀️ No more data in response');
  })

});

request.end(
    JSON.stringify({
      title: '🙋‍♂️ Title of my post',
      body: '🤠️ This is some text about my post.',
    })
);


// request.write(JSON.stringify({body: '🤠️ This is some text about my post.'}));
// request.write(JSON.stringify({message: '😻️ Hey you still there?'}));


// request.end(JSON.stringify({ message: 'This is going to be my last message!'}));

