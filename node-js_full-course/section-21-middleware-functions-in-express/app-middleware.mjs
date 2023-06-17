import express from 'express';
import morgan from 'morgan';


const app = express();

// logs info about request
app.use(morgan('tiny'));

// converts JSON to JS Object in POST, PUT, PATCH requests
app.use(express.json());

// using middleware for parsing / extended: true - using external module qs
// converts from data to JS Object in POST, PUT, PATCH requests
app.use(express.urlencoded({ extended: true }));


app.use((req, res) => {
	console.log('>>>>+++++++> <|> *******> [REQUEST BODY] --->', req.body);
	return res.send('This is express server');
});

app.listen(3000, () => console.log('server is listening at port 3000'));
