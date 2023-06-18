import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


const app = express();

// logs info about request
app.use(morgan('tiny'));

// converts JSON to JS Object in POST, PUT, PATCH requests
app.use(express.json());

// using middleware for parsing / extended: true - using external module qs
// converts from data to JS Object in POST, PUT, PATCH requests
app.use(express.urlencoded({ extended: true }));

// enable all CORS requests
app.use(cors());


app.use((req, res) => {
	const personData = {
		name: 'Vasyl',
		isStudent: true,
		hobbies: ['hiking', 'study something', 'rest', 'running']
	};
	console.log(req.body);
	return res.json(personData);
});

app.listen(5001, () => console.log('server is listening at port 5001'));
