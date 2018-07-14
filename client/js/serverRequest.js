const axios = require("axios");
const moment = require("moment");

const { addListToUl, calculateNumOfItem, putInformationInForm } = require("./domManipulation");

/*
    Make request to the server to get all of the sitzungen
    by calculating the number of item needed to fit the window screen
    And then fetch the data from the server
*/
const makeGetRequest = function () {
	calculateNumOfItem()
		.then(numOfItems => {
			console.log(numOfItems);
			axios.get(`/sitzungen?json=true&count=${numOfItems}`)
				.then(data => {
					let ul = document.getElementById("sitzung-list");
					while (ul.hasChildNodes()) {
						ul.removeChild(ul.lastChild);
					}

					data.data.sitzungen.forEach((sitzung, index) => {
						let li = addListToUl(sitzung, index, ul);
						li.addEventListener("click", function () {
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

const makePatchRequest = function (id) {
	// TODO verify and validate the input

	// TODO create the object which is going to sent

	// TODO make patch request to server using axios.post

	// TODO server will send the response with the created sitzung, show it

	// TODO catch the error, in case the id is not in the database
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
