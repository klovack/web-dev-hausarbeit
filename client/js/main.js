const moment = require("moment");
require("moment/locale/de");

const { fetchAll, fetchOne } = require("./sitzungData");

// moment.locale("de");

// (async function add() {
// 	let data = await fetchAll();

// ====================
// Add Data dynamically
// ====================

// 	if (data) {
// 		let output = "";
// 		data.forEach(element => {
// 			output += `
//                 <li class="sitzung-list-item">
//                     <h3>${element.ort} <span class="sitzung-list-item-date">${moment(element.datum).format("D. MMM YYYY")}</span></h3>
//                     <a href="https://maps.google.com?q=${element.ort}" target="_blank">Karteansicht</a>
//                 </li>
//             `;
// 		});

// 		let list = document.getElementById("sitzung-list");
// 		list.innerHTML = output;

// 		list.addEventListener("click", function (e) {
// 			console.log(e);
// 		});
// 	}
// })();
