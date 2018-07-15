const axios = require("axios");
const moment = require("moment");

let { itemCount } = require("./util");
const { addListToUl,
	calculateNumOfItem,
	putInformationInFormDetail,
	putInformationInFormPatch,
	calculatePagination,
	setLoadingAnim,
	clearSitzungInfo } = require("./domManipulation");

/*
    Make request to the server to get all of the sitzungen
    by calculating the number of item needed to fit the window screen
    And then fetch the data from the server
*/
const makeGetRequest = function (pageNumber) {
	return calculateNumOfItem()
		.then(numOfItems => {
			setLoadingAnim(true);
			axios.get(`/sitzungen?json=true&count=${numOfItems}&page=${pageNumber}`)
				.then(data => {
					let ul = document.getElementById("sitzung-list");
					while (ul.hasChildNodes()) {
						ul.removeChild(ul.lastChild);
						//ul.lastChild.remove();
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
							putInformationInFormDetail(sitzung);

							let edit = document.getElementById("edit");
							edit.addEventListener("click", function () {
								putInformationInFormPatch(sitzung);
							});

							let del = document.getElementById("delete");
							del.addEventListener("click", function () {
								makeDelRequest(sitzung._id);
							});
						});
					});
					setLoadingAnim(false);
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
	let objektArray = objektDiv.getElementsByTagName("input");
	let beobachtendeObjekte = [];

	for (var i = 0; i < objektArray.length; i++) {
		if (objektArray[i].value !== "") {
			beobachtendeObjekte[i] = objektArray[i].value;
		}
	}

	axios.post("/sitzungen", {
		ort,
		datum,
		beobachtendeObjekte
	}).then(data => {
		console.log(data);
		makeGetRequest();
		clearSitzungInfo();
	}).catch(err => {
		console.log(err);
	});
};

const makeGetIdRequest = function (id) {
	axios.get("/sitzungen/" + id).then(data => {
		console.log(data);
	}).catch(err => {
		console.log(err);
	});
};

const makePatchRequest = function (evt) {
	if (evt) {
		evt.preventDefault();
	}

	let ort = document.getElementById("ortsname").value;

	let datumInput = document.getElementById("datum");
	let datum = moment(datumInput.value);

	let objektDiv = document.getElementById("objects_container");
	let inputs = objektDiv.getElementsByTagName("input");
	let beobachtendeObjekte = [];

	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].value !== "") {
			beobachtendeObjekte[i] = inputs[i].value;
		}
	}

	const activeLi = document.getElementById("sitzung-list").getElementsByClassName("active")[0];

	axios.patch("/sitzungen/" + activeLi.id, {
		ort,
		datum,
		beobachtendeObjekte
	}).then(() => {
		makeGetRequest().then(() => {
			// For some reason it doesn't work so for now just clear the input
			//setTheLiToActive(data.data.sitzung._id);
			//putInformationInFormDetail(data.data.sitzung);
			clearSitzungInfo();
		});
		//location.reload();
	}).catch(err => {
		console.log(err);
	});
};

const makeDelRequest = function (id) {
	axios.delete("/sitzungen/" + id).then(data => {
		console.log(data);
		makeGetRequest();
		clearSitzungInfo();
	}).catch(err => {
		console.log(err);
	});
};

module.exports = { makeGetRequest, makePostRequest, makeGetIdRequest, makeDelRequest, makePatchRequest };
