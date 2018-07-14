const moment = require("moment");

const addListToUl = (sitzung, index, ul) => {
	let li = document.createElement("li");
	li.classList.add("list-item");
	li.id = `sitzung-${index}`;
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

const putInformationInForm = (sitzung) => {
	let ortsname = document.getElementById("ortsname");
	ortsname.value = sitzung.ort;
};

/*
    Sitzung list container divided by 75px (sitzung-item + margin)
	Return promise which contains number of item data
*/
const calculateNumOfItem = function () {
	const container = document.getElementById("sitzung-list-container");
	const numOfItem = container.clientHeight / 100;

	return Promise.resolve(Math.floor(numOfItem));
};

module.exports = { addListToUl, calculateNumOfItem, putInformationInForm };
