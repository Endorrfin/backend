import express from 'express';
import morgan from 'morgan';


const app = express();

// app.use(morgan('combined'));
// app.use(morgan('short'));
app.use(morgan('tiny'));


app.use((req, res) => res.send('This is express server'));

app.listen(3000, () => console.log('server is listening at port 3000'));
