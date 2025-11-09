const Butter = require('../butter');

const USERS = [
  {id: 1, name: 'Mark Twain', username: 'mark.t', password: 'string'},
  {id: 2, name: 'Karl Green', username: 'karl.g', password: 'string'},
  {id: 3, name: 'Elon Musk', username: 'elon.m', password: 'string'},
];

const POSTS = [
  {
    id: 1,
    title: 'Post title 1️⃣',
    body: '📝 This is description about post 1️⃣.',
    userId: 1,
  },
  {
    id: 2,
    title: 'Post title 2️⃣',
    body: '📝 This is description about post 2️⃣.',
    userId: 2,
  },
  {
    id: 3,
    title: 'Post title 3️⃣',
    body: '📝 This is description about post 3️⃣.',
    userId: 3,
  },

];

const PORT = 8000;

const server1 = new Butter();

// ------- Files Routes ------- //\
server1.route('get', '/', (req, res) => {
  res.sendFile('./public/index.html', 'text/html');
});

server1.route('get', '/login', (req, res) => {
  res.sendFile('./public/index.html', 'text/html');
});

server1.route('get', '/styles.css', (req, res) => {
  res.sendFile('./public/style.css', 'text/css');
});

server1.route('get', '/scripts.js', (req, res) => {
  res.sendFile('./public/scripts.js', 'text/javascript');
});


// ------- JSON Routes ------- //

server1.route("post", "/api/login", (req, res) => {

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  })

  req.on("end", () => {
    body = JSON.parse(body);

    const username = body.username;
    const password = body.password;

    // Check if the user exist
    const user = USERS.find((user) => user.username === username);

    // Check the password if the user was found
    if (user && user.password === password) {
      // At this point, we know that the client is who they say they are
      res.status(200).json({ message: "Logged in successfully!" });
    } else {
      res.status(401).send({ error: "Invalid username or password." });
    }
  });
});

server1.route("get", "/api/post", (req, res) => {

})


// Send the list of all the posts that we have
server1.route('get', '/api/posts', (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find(user => user.id === post.userId);
    post.author = user.name;
    return post;
  })

  res.status(200).json(posts);
});


server1.listen(PORT, () => {
  console.log(`💢 Server has started on port ${PORT}`);
});
