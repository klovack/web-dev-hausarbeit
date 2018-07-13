const { debounce } = require("./util");
const { makeGetRequest } = require("./serverRequest");

makeGetRequest();
window.addEventListener("resize", debounce(makeGetRequest, 300, false), true);
