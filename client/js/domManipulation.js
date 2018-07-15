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
	let detail = document.getElementById("sitzungInfo");
	detail.style.display = "block";
	detail.className = "";
	detail.classList.add("sitzungDetail");

	let edit = document.getElementById("edit");
	if (edit.style.display === "none") {
		edit.style.display = "inline-block";
	}

	let patch = document.getElementById("patchSitzung");
	if (patch.style.display !== "none") {
		patch.style.display = "none";
	}

	let post = document.getElementById("postSitzung");
	if (post.style.display !== "none") {
		post.style.display = "none";
	}

	let createNew = document.getElementById("createNew");
	createNew.style.display = "none";

	let cancel = document.getElementById("cancel");
	if (cancel.style.display === "none") {
		cancel.style.display = "inline-block";
	}

	let add = document.getElementById("add");
	if (add.style.display !== "none") {
		add.style.display = "none";
	}

	let ortsname = document.getElementById("ortsname");
	ortsname.value = sitzung.ort;
	ortsname.disabled = true;
	let datum = document.getElementById("datum");
	datum.value = moment(sitzung.datum).format("YYYY-MM-DD");
	datum.disabled = true;

	let objektArray = sitzung.beobachtendeObjekte;
	let div = document.getElementById("objects_container");
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
		input.placeholder = "Keine Objekte gesichtet";
		input.disabled = true;
		div.appendChild(input);
	}
};

const putInformationInFormPatch = (sitzung) => {
	let patch = document.getElementById("sitzungInfo");
	patch.style.display = "block";
	patch.className = "";
	patch.classList.add("sitzungPatch");

	let edit = document.getElementById("edit");
	if (edit.style.display !== "none") {
		edit.style.display = "none";
	}

	let patchic = document.getElementById("patchSitzung");
	if (patchic.style.display === "none") {
		patchic.style.display = "inline-block";
	}

	let post = document.getElementById("postSitzung");
	if (post.style.display !== "none") {
		post.style.display = "none";
	}

	let createNew = document.getElementById("createNew");
	createNew.style.display = "none";

	let cancel = document.getElementById("cancel");
	if (cancel.style.display === "none") {
		cancel.style.display = "inline-block";
	}

	let add = document.getElementById("add");
	if (add.style.display === "none") {
		add.style.display = "inline-block";
	}

	let ortsname = document.getElementById("ortsname");
	ortsname.disabled = false;
	ortsname.value = sitzung.ort;
	let datum = document.getElementById("datum");
	datum.disabled = false;
	datum.value = moment(sitzung.datum).format("YYYY-MM-DD");

	let objektArray = sitzung.beobachtendeObjekte;
	let div = document.getElementById("objects_container");
	while (div.hasChildNodes()) {
		div.removeChild(div.lastChild);
	}
	objektArray.forEach((element, index) => {
		let innDiv = document.createElement("div");
		innDiv.id = "innDiv-" + index;
		innDiv.innerHTML = `
						<input type="text" id="objekt-${index}" value="${element}" style="display: inline-block;">
						<i class="material-icons md-24" id="ic-${index}">delete</i>
						`;
		innDiv.style.display = "flex";
		innDiv.style.alignItems = "center";
		div.appendChild(innDiv);
	});
	setListenerOnIc();
	setListenerOnAdd();
};

const setListenerOnIc = function () {
	let div = document.getElementById("objects_container");

	let ic = document.getElementById("ic-" + (div.children.length - 1));
	ic.addEventListener("click", function () {
		deleteObject((div.children.length - 1));
	});
	ic.style.cursor = "pointer";
};

const setListenerOnAdd = function () {
	let add = document.getElementById("add");
	add.addEventListener("click", function () {
		addObject();
	});
};

const deleteObject = function (index) {
	let div = document.getElementById("objects_container");
	let del = document.getElementById("innDiv-" + index);
	div.removeChild(del);
	del.remove();
};

const addObject = function () {
	let div = document.getElementById("objects_container");
	let innDiv = document.createElement("div");
	innDiv.id = "innDiv-" + div.children.length;
	innDiv.innerHTML = `
					<input type="text" id="objekt-${div.children.length}" style="display: inline-block;">
					<i class="material-icons md-24" id="ic-${div.children.length}">delete</i>
					`;
	innDiv.style.display = "flex";
	innDiv.style.alignItems = "center";
	div.appendChild(innDiv);
	setListenerOnIc();
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

const setLoadingAnim = function (isLoading) {
	let loadingSpinner = document.getElementById("spinner-loader");
	if (isLoading) {
		loadingSpinner.classList.add("onload");
	}
	else {
		loadingSpinner.classList.remove("onload");
	}
};

const clearSitzungInfo = function () {
	let ortsnameInput = document.getElementById("ortsname");
	let datumInput = document.getElementById("datum");
	let objectsContainer = document.getElementById("objects_container");
	let sitzungInfo = document.getElementById("sitzungInfo");

	sitzungInfo.style.display = "none";

	ortsnameInput.value = "";
	datumInput.value = "";
	while (objectsContainer.hasChildNodes()) {
		objectsContainer.removeChild(objectsContainer.lastChild);
	}

	setToDefaultButtons();
};

const setToDefaultButtons = function () {
	let activeLi = document.getElementsByClassName("active")[0];

	if (activeLi) {
		activeLi.classList.remove("active");
	}

	let createNew = document.getElementById("createNew");
	createNew.style.display = "inline-block";

	let post = document.getElementById("postSitzung");
	post.style.display = "none";

	let patch = document.getElementById("patchSitzung");
	patch.style.display = "none";

	let edit = document.getElementById("edit");
	edit.style.display = "none";

	let cancel = document.getElementById("cancel");
	cancel.style.display = "none";
};

const setTheLiToActive = function (id) {
	let li = document.getElementById(id);
	if (li) {
		li.classList.add("active");
	}
};

module.exports = { addListToUl, calculateNumOfItem, putInformationInFormDetail, putInformationInFormPatch, calculatePagination, setLoadingAnim, clearSitzungInfo, setTheLiToActive };
