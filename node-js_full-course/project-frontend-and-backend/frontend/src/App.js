import './App.css';
import { useEffect, useState } from 'react';

function App() {
	const [person, setPerson] = useState();

	useEffect(() => {
		fetch('http://127.0.0.1:5001')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPerson(data);
			})
			.catch((err) => console.log(err));
	}, []);
	return <div className='App'>
		{person && <>
			<h1>Information about person</h1>
			<h2>{person.name}</h2>
			<h2>{person.isStudent.toString()}</h2>
			<h2>{person.isStudent ? 'Student' : 'Person'}</h2>
			<h2>{person.hobbies}</h2>
		</>}

	</div>;
}

export default App;
