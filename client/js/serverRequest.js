const axios = require("axios");

const { addListToUl, calculateNumOfItem } = require("./domManipulation");

/*
    Make request to the server to get all of the sitzungen
    by calculating the number of item needed to fit the window screen
    And then fetch the data from the server
*/
const makeGetRequest = function () {
	calculateNumOfItem()
		.then(numOfItems => {
			console.log(numOfItems);
			axios.get(`/sitzungen?json=true&count=${numOfItems}`)
				.then(data => {
					let ul = document.getElementById("sitzung-list");
					while (ul.hasChildNodes()) {
						ul.removeChild(ul.lastChild);
					}

					data.data.sitzungen.forEach((sitzung, index) => {
						addListToUl(sitzung, index, ul);
					});
				})
				.catch(err => {
					console.log(err);
				});
		});
};

module.exports = { makeGetRequest }
;
