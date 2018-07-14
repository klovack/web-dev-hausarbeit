const moment = require("moment");

const addListToUl = (sitzung, index, ul) => {
	let li = document.createElement("li");
	li.classList.add("list-item");
	li.id = `sitzung-${index}`;
	li.innerHTML = `
                <div>
                    <span>${sitzung.ort}</span>
                    <a target="_blank" href="https://maps.google.com/?q=${sitzung.ort}"><i class="material-icons md-18">place</i></a>
                </div>
                <span>${moment(sitzung.datum).format("DD.MM.YYYY")}</span>
            `;
	ul.appendChild(li);
	return li;
};

const putInformationInForm = (sitzung) => {
	let ortsname = document.getElementById("ortsname");
	ortsname.value = sitzung.ort;
	let datum = document.getElementById("datum");
	datum.value = moment(sitzung.datum).format("YYYY-MM-DD");

	let objektArray = sitzung.beobachtendeObjekte;
	let div = document.getElementById("objects_container");
	while (div.hasChildNodes()) {
		div.removeChild(div.lastChild);
	}
	objektArray.forEach((element, index) => {
		let input = document.createElement("input");
		input.id = `objekt-${index}`;
		input.value = element;
		div.appendChild(input);
		console.log("angekommen");
	});

	// Array anlegen, welches alle Objekte einer Sitzung enthält
	// Schleife die so viele inputs anlegt, wie im Array Objekte sind und direkt füllen
};

/*
    Sitzung list container divided by 75px (sitzung-item + margin)
	Return promise which contains number of item data
*/
const calculateNumOfItem = function () {
	const container = document.getElementById("sitzung-list-container");
	const numOfItem = container.clientHeight / 100;

	return Promise.resolve(Math.floor(numOfItem));
};

const calculatePagination = function (itemCount, pageNumber, numOfItems) {
	const numOfPages = Math.ceil(itemCount / numOfItems);
	if (pageNumber < numOfPages) {
		showNextArrow();
	}
	if (pageNumber > 1) {
		showPrevArrow();
	}
	if (pageNumber === numOfPages) {
		// Hide the next arrow
		hideNextArrow();
	}
	if (pageNumber === 1) {
		// Hide the back arrow
		hidePrevArrow();
	}
	else if (pageNumber < 1 || pageNumber > numOfPages) {
		// Set the page to 1
		pageNumber = 1;
	}
};

const hideNextArrow = function () {
	document.getElementById("arrow-next").classList.add("hide");
};

const showNextArrow = function () {
	document.getElementById("arrow-next").classList.remove("hide");
};

const hidePrevArrow = function () {
	document.getElementById("arrow-previous").classList.add("hide");
};

const showPrevArrow = function () {
	document.getElementById("arrow-previous").classList.remove("hide");
};

module.exports = { addListToUl, calculateNumOfItem, putInformationInForm, calculatePagination };
