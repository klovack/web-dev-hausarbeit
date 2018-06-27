async function fetchAll() {
	let data = await fetch("/sitzungen").then(res => res.json()).then(data => data);
	return data.sitzungen;
}

async function fetchOne(id) {
	let data = await fetch(`/sitzungen/${id}`).then(res => res.json()).then(data => data);
	return data;
}

module.exports = {
	fetchAll,
	fetchOne
};
