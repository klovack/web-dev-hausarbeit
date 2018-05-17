const mongoose = require("mongoose");

const SitzungSchema = new mongoose.Schema({
	datum: {
		type: Date,
		required: true
	},
	ort: {
		type: String,
		required: true
	},
	beobachtendeObjekte: [String],
	benutzer: {
		type: mongoose.Schema.Types.ObjectId
	}
});

const Sitzung = mongoose.model("Sitzung", SitzungSchema);

module.exports = { Sitzung };
