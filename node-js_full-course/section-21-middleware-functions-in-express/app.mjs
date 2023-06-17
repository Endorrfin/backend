import express from 'express';
import morgan from 'morgan';
import qs from 'querystring';


const app = express();

// const logger = (req, res, next) => {
// 	// console.log(req.method, req.path);
// 	next();
// };
//
// app.use(logger);

app.use(morgan('tiny'));

// // I VARIANT WITHOUT MIDDLEWARE
// app.use((req, res, next) => {
// 	// console.log(req);
// 	let data = '';
// 	req.on('data', (chunk) => data += chunk);
// 	req.on('end', () => {
// 		const parseJSON = JSON.parse(data);
// 		req.body = parseJSON;
// 		next();
// 	});
// });

// II VARIANT WITH MIDDLEWARE
app.use(express.json());


app.use((req, res, next) => {
	if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
		let data = '';
		req.on('data', (chunk) => data += chunk.toString());
		req.on('end', () => {
			const parsedFromData = qs.parse(data);
			// console.log(parsedFromData);
			req.body = parsedFromData;
			next();
		});
	} else {
		next();
	}
});


// app.use((req, res) => res.send('This is express server'));
app.use((req, res) => {
	console.log('>>>>+++++++> <|> *******> [REQUEST BODY] --->', req.body);
	return res.send('This is express server');
});

app.listen(3000, () => console.log('server is listening at port 3000'));
