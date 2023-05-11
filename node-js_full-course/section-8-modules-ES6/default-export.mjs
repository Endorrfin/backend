async function getUsers(url) {
	const res = await fetch(url);
	const users = await res.json();
	return users;
}


export default getUsers;
