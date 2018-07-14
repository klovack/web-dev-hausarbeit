const { debounce, addListenerToControls, pageNumber } = require("./util");
const { makeGetRequest } = require("./serverRequest");

makeGetRequest(pageNumber);
window.addEventListener("resize", debounce(makeGetRequest, 100, false), true);
addListenerToControls();
