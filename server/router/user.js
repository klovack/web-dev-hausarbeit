const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = require("express").Router();     //eslint-disable-line

const { mongoose } = require("../db/mongoose");		// eslint-disable-line
const { User } = require("../models/user");
const config = require("../config/config");

// Use body parser
router.use(bodyParser.json());

// Register
router.post("/register", (req, res) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password // Later we will hash it
	});

	User.addUser(newUser, (error, user) => {
		if (error) {
			res.status(400).send(error);
		}
		else {
			const sentUser = {
				name: user.name,
				email: user.email,
				username: user.username
			};
			res.send({ user: sentUser, message: "User is registered" });
		}
	});
});

// Authenticate
router.post("/authenticate", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	// Find the user by username
	User.findUserByUsername(username, (error, user) => {
		if (error) {
			return res.status(400).send(error);
		}

		// Check if there's a user
		if (!user) {
			return res.status(404).send({
				message: "User not found",
				name: "UserNotFoundError"
			});
		}

		// Check if the password match
		User.comparePassword(password, user.password, (err, isMatch) => {
			if (err) {
				return res.status(400).send(error);
			}

			// If match, send the token
			if (isMatch) {
				const token = jwt.sign({ data: user }, config.secret, {
					expiresIn: 604800 // 1 Week
				});

				return res.status(200).send({
					success: true,
					token: `JWT ${token}`,
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			}
			else {
				// Send error
				return res.status(400).send({
					message: "Password false",
					name: "PasswordNotMatchError"
				});
			}
		});

		return null;
	});
});

// Profile
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
	res.send("Profile");
});

module.exports = router;
