let pageNumber = 1;
let itemCount = 0;

/*
	Executes the function only after the number of wait times
	otherwise it won't call the function
*/

const { clearSitzungInfo, addObject, putInformationInFormPost } = require("./domManipulation");
const { makePostRequest, makeGetRequest, makePatchRequest, makeDelRequest } = require("./serverRequest");

const debounce = (func, wait, immediate) => {
	var timeout;
	return () => {
		const context = this;
		const args = arguments;
		const later = function () {
			timeout = null;
			if (!immediate) { func.apply(context, args); }
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) { func.apply(context, args); }
	};
};

const addListenerToControls = () => {
	addListenerToPostRequest();
	addListenerToPagination();
	addListenerToPatchRequest();
	addListenerToCreateNewButton();
	addListenerToCreateCancelButton();
	addListenerToAddButton();
	addListenerToDelete();
};

const addListenerToPagination = () => {
	document.getElementById("arrow-next").addEventListener("click", function () {
		pageNumber++;
		clearSitzungInfo();
		makeGetRequest(pageNumber);
	});
	document.getElementById("arrow-previous").addEventListener("click", function () {
		pageNumber--;
		clearSitzungInfo();
		makeGetRequest(pageNumber);
	});
};

const addListenerToPostRequest = () => {
	let postSitzung = document.getElementById("postSitzung");
	postSitzung.addEventListener("click", function () {
		makePostRequest();
	});
};

const addListenerToPatchRequest = () => {
	let patchSitzung = document.getElementById("patchSitzung");
	patchSitzung.addEventListener("click", function () {
		makePatchRequest();
	});
};

const addListenerToDelete = () => {
	let del = document.getElementById("delete");
	del.addEventListener("click", function () {
		makeDelRequest();
	});
};

const addListenerToCreateNewButton = () => {
	let createNew = document.getElementById("createNew");
	createNew.addEventListener("click", function () {
		putInformationInFormPost();
	});
};

const addListenerToAddButton = () => {
	let add = document.getElementById("add");
	add.addEventListener("click", function () {
		addObject();
	});
};

const addListenerToCreateCancelButton = () => {
	let createNew = document.getElementById("cancel");
	createNew.addEventListener("click", function () {
		clearSitzungInfo();
	});
};

module.exports = { debounce, pageNumber, itemCount, addListenerToControls };
