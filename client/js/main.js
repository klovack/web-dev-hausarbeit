const { debounce } = require("./util");
const { makeGetRequest } = require("./serverRequest");
let { pageNumber } = require("./util");

makeGetRequest(pageNumber);
window.addEventListener("resize", debounce(makeGetRequest, 100, false), true);

(function () {
	document.getElementById("arrow-next").addEventListener("click", function () {
		console.log("Next");
		pageNumber++;
		makeGetRequest(pageNumber);
	});
	document.getElementById("arrow-previous").addEventListener("click", function () {
		console.log("Previous");
		pageNumber--;
		makeGetRequest(pageNumber);
	});
})();
