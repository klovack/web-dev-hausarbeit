const { makeGetRequest } = require("./serverRequest");

let pageNumber = 1;
let itemCount = 0;

/*
	Executes the function only after the number of wait times
	otherwise it won't call the function
*/
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

const addListenerToPagination = () => {
	document.getElementById("arrow-next").addEventListener("click", function () {
		pageNumber++;
		makeGetRequest(pageNumber);
	});
	document.getElementById("arrow-previous").addEventListener("click", function () {
		pageNumber--;
		makeGetRequest(pageNumber);
	});
};

module.exports = { debounce, pageNumber, itemCount, addListenerToPagination };
