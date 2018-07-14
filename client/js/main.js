const { debounce } = require("./util");
const { makeGetRequest } = require("./serverRequest");
const { pageNumber, addListenerToPagination } = require("./util");

makeGetRequest(pageNumber);
window.addEventListener("resize", debounce(makeGetRequest, 100, false), true);
addListenerToPagination();
