const axios = require("axios");

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
	// TODO verify and validate the input

	// TODO make post request to server using axios.post

	// TODO server will send the response with the created sitzung, show it
};

const makeGetIdRequest = function (id) {
	// TODO call axios.get with the id as the parameter
	axios.get("/sitzungen/" + id).then(data => {
		console.log(data);
	});

	// TODO show the data which server responded with

	// TODO catch the error, in case the id is not in the database
};

const makePatchRequest = function (id) {
	// TODO verify and validate the input

	// TODO create the object which is going to sent

	// TODO make patch request to server using axios.post

	// TODO server will send the response with the created sitzung, show it

	// TODO catch the error, in case the id is not in the database
};

const makeDelRequest = function (id) {
	// TODO make del request axios.delete with the id as the parameter

	// TODO show the data which server responded with

	// TODO catch the error, in case the id is not in the database
};

module.exports = { makeGetRequest, makePostRequest, makeGetIdRequest, makeDelRequest, makePatchRequest };
