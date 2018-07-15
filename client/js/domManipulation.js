const moment = require("moment");

const addListToUl = (sitzung, index, ul) => {
	let li = document.createElement("li");
	li.classList.add("list-item");
	li.id = sitzung._id;
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

const putInformationInFormDetail = (sitzung) => {
	hideSections();
	showDetailed();

	let ortsname = document.getElementById("ortsname_detail");
	ortsname.value = sitzung.ort;
	let datum = document.getElementById("datum_detail");
	datum.value = moment(sitzung.datum).format("YYYY-MM-DD");

	let objektArray = sitzung.beobachtendeObjekte;
	let div = document.getElementById("objects_container_detail");
	while (div.hasChildNodes()) {
		div.removeChild(div.lastChild);
	}
	objektArray.forEach((element, index) => {
		let input = document.createElement("input");
		input.id = `objekt-${index}`;
		input.value = element;
		input.disabled = true;
		div.appendChild(input);
	});
	if (!div.hasChildNodes()) {
		let input = document.createElement("input");
		input.value = "Keine Objekte gesichtet";
		input.disabled = true;
		div.appendChild(input);
	}
};

const showDetailed = function () {
	let sitzungDetail = document.getElementById("sitzungDetail");
	if (sitzungDetail.style.display === "none") {
		sitzungDetail.style.display = "block";
	}
	let edit = document.getElementById("edit");
	if (edit.style.display === "none") {
		edit.style.display = "inline-block";
	}
};

const hideSections = function () {
	let sitzungDetail = document.getElementById("sitzungDetail");
	if (sitzungDetail.style.display !== "none") {
		sitzungDetail.style.display = "none";
	}
	let sitzungPatch = document.getElementById("sitzungPatch");
	if (sitzungPatch.style.display !== "none") {
		sitzungPatch.style.display = "none";
	}
	let sitzungPost = document.getElementById("sitzungPost");
	if (sitzungPost.style.display !== "none") {
		sitzungPost.style.display = "none";
	}
	let edit = document.getElementById("edit");
	if (edit.style.display !== "none") {
		edit.style.display = "none";
	}
};

/*
    Sitzung list container divided by 75px (sitzung-item + margin)
	Return promise which contains number of item data
*/
const calculateNumOfItem = function () {
	const container = document.getElementById("sitzung-list-container");
	const numOfItem = container.clientHeight / 75;

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

module.exports = { addListToUl, calculateNumOfItem, putInformationInFormDetail, calculatePagination };
