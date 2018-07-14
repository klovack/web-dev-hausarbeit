const axios = require("axios");
const moment = require("moment");

let { itemCount } = require("./util");
const { addListToUl, calculateNumOfItem, putInformationInForm, calculatePagination } = require("./domManipulation");

/*
    Make request to the server to get all of the sitzungen
    by calculating the number of item needed to fit the window screen
    And then fetch the data from the server
*/
const makeGetRequest = function (pageNumber) {
	calculateNumOfItem()
		.then(numOfItems => {
			axios.get(`/sitzungen?json=true&count=${numOfItems}&page=${pageNumber}`)
				.then(data => {
					let ul = document.getElementById("sitzung-list");
					while (ul.hasChildNodes()) {
						ul.removeChild(ul.lastChild);
					}

					pageNumber = data.data.pageNumber;
					itemCount = data.data.itemCount;

					calculatePagination(itemCount, pageNumber, numOfItems);

					data.data.sitzungen.forEach((sitzung, index) => {
						let li = addListToUl(sitzung, index, ul);
						li.addEventListener("click", function () {
							const activeLi = ul.getElementsByClassName("active")[0];

							if (activeLi) {
								activeLi.classList.remove("active");
							}

							li.classList.add("active");
							putInformationInForm(sitzung);
						});
					});
				})
				.catch(err => {
					console.log(err);
				});
		});
};

const makePostRequest = function () {
	let ort = document.getElementById("ortsname").value;

	let datumInput = document.getElementById("datum");
	let datum = moment(datumInput.value);

	let objektDiv = document.getElementById("objects_container");
	let objektArray = objektDiv.getElementsByTagName("*");
	let beobachtendeObjekte = [];

	for (var i = 0; i < objektArray.length; i++) {
		console.log(objektArray[i].value);
		beobachtendeObjekte[i] = objektArray[i].value;
	}

	axios.post("/sitzungen", {
		ort,
		datum,
		beobachtendeObjekte
	}).then(data => {
		console.log(data);
	}).catch(err => {
		console.log(err);
	});

	makeGetRequest();
};

const makeGetIdRequest = function (id) {
	axios.get("/sitzungen/" + id).then(data => {
		console.log(data);
	}).catch(err => {
		console.log(err);
	});
};

const makePatchRequest = function () {
	let ort = document.getElementById("ortsname").value;

	let datumInput = document.getElementById("datum");
	let datum = moment(datumInput.value);

	let objektDiv = document.getElementById("objects_container");
	let objektArray = objektDiv.getElementsByTagName("*");
	let beobachtendeObjekte = [];

	for (var i = 0; i < objektArray.length; i++) {
		console.log(objektArray[i].value);
		beobachtendeObjekte[i] = objektArray[i].value;
	}

	const activeLi = document.getElementById("sitzung-list").getElementsByClassName("active")[0];

	axios.patch("/sitzungen/" + activeLi.id, {
		ort,
		datum,
		beobachtendeObjekte
	}).then(data => {
		console.log(data);
		makeGetRequest();
	}).catch(err => {
		console.log(err);
	});
};

const makeDelRequest = function (id) {
	axios.delete("/sitzungen/" + id).then(data => {
		console.log(data);
	}).catch(err => {
		console.log(err);
	});
	makeGetRequest();
};

module.exports = { makeGetRequest, makePostRequest, makeGetIdRequest, makeDelRequest, makePatchRequest };
