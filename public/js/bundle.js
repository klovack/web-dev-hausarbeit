(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const datei1 = () => {
	alert("alert aus datei1");
};

module.exports = datei1;

},{}],2:[function(require,module,exports){
const datei2 = () => {
	alert("alert aus datei2");
};

module.exports = datei2;

},{}],3:[function(require,module,exports){
const datei1 = require("./datei1");
const datei2 = require("./datei2");

datei1();
datei2();

},{"./datei1":1,"./datei2":2}]},{},[3]);
