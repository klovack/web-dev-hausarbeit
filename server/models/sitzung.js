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
	_benutzer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

const Sitzung = mongoose.model("Sitzung", SitzungSchema);

module.exports = { Sitzung };
