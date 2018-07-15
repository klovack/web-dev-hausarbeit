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
		// required: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	modifiedAt: {
		type: Date,
		default: Date.now
	}
});

const Sitzung = mongoose.model("Sitzung", SitzungSchema);

module.exports = { Sitzung };
