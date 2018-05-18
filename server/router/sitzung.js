const router = require("express").Router();     // eslint-disable-line
const bodyParser = require("body-parser");
const moment = require("moment");
const passport = require("passport");
const { ObjectID } = require("mongodb");

const { mongoose } = require("../db/mongoose");		// eslint-disable-line
const { Sitzung } = require("../models/sitzung");

// Use body parser
router.use(bodyParser.json());

// Show all sitzung
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	Sitzung.find({ _benutzer: req.user._id })
		.then(sitzungen => {
			res.send({ sitzungen });			// Send sitzung if found
		}, error => {
			res.status(400).send(error);		// Send error if there's database error
		})
		.catch(error => {
			res.status(500).send(error);		// Send error if there's unexpected error
		});
});

// Create new sitzung
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
	let sitzung = new Sitzung({
		ort: req.body.ort,
		beobachtendeObjekte: req.body.beobachtendeObjekte,
		_benutzer: req.user._id
	});

	// Check if the date provided is valid
	if (!req.body.datum || !moment(req.body.datum).isValid) {
		return res.status(400).send({
			message: "Date is not a valid",
			name: "DateValidationError"
		});
	}
	else {
		sitzung.datum = moment(req.body.datum);
	}

	sitzung.save().then(document => {
		res.send(document);
	}, error => {
		res.status(400).send(error);
	}).catch(error => {
		res.status(500).send(error);
	});

	return null;
});

// Show specific sitzung associated with the id
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { id } = req.params;

	// Check if the id is valid
	if (!ObjectID.isValid(id)) {
		return res.status(400).send({
			message: "ID is not valid ObjectID",
			name: "IDValidationError"
		});
	}

	Sitzung.findOne({
		_id: id,
		_benutzer: req.user._id
	})
		.then(sitzung => {
			if (!sitzung) {
				return res.status(404).send({
					message: "Sitzung with that id is not in the database",
					name: "IDNotFoundError"
				});
			}
			return res.status(200).send({ sitzung });
		}).catch(error => {
			return res.status(500).send(error);
		});

	return null;
});

// Delete the sitzung associated with the id
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { id } = req.params;

	// Check if the id is valid
	if (!ObjectID.isValid(id)) {
		return res.status(400).send({
			message: "ID is not valid ObjectID",
			name: "IDValidationError"
		});
	}

	Sitzung.findOneAndRemove({
		_id: id,
		_benutzer: req.user._id
	})
		.then(sitzung => {
			if (!sitzung) {
				return res.status(404).send({
					message: "Sitzung with that id is not in the database",
					name: "IDNotFoundError"
				});
			}

			return res.status(200).send({ sitzung });
		})
		.catch(error => {
			return res.status(500).send(error);
		});

	return null;
});

// Edit the sitzung associated with the id
router.patch("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { id } = req.params;
	let toBeUpdated = {};

	// Check if the id is valid
	if (!ObjectID.isValid(id)) {
		return res.status(400).send({
			message: "ID is not valid ObjectID",
			name: "IDValidationError"
		});
	}

	// Filter the request body
	if (req.body.ort) {
		toBeUpdated.ort = req.body.ort;
	}

	if (req.body.beobachtendeObjekte) {
		toBeUpdated.beobachtendeObjekte = req.body.beobachtendeObjekte;
	}

	if (!moment(req.body.datum).isValid) {
		return res.status(400).send({
			message: "Date is not a valid",
			name: "DateValidationError"
		});
	}
	else if (req.body.datum) {
		toBeUpdated.datum = moment(req.body.datum);
	}

	// Update the sitzung
	Sitzung.findOneAndUpdate({
		_id: id,
		_benutzer: req.user._id
	}, { $set: toBeUpdated }, { new: true })
		.then(sitzung => {
			if (!sitzung) {
				return res.status(404).send({
					message: "Sitzung with that id is not in the database",
					name: "IDNotFoundError"
				});
			}

			return res.status(200).send({ sitzung });
		})
		.catch(error => {
			return res.status(500).send(error);
		});

	return null;
});

module.exports = router;
