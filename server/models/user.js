const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const UserSchema = mongoose.Schema({        // eslint-disable-line
	name: String,
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.statics.findUserById = function (id, callback) {
	User.findById(id, callback);
};

UserSchema.statics.findUserByUsername = function (username, callback) {
	const query = { username };
	User.findOne(query, callback);
};

UserSchema.statics.addUser = function (newUser, callback) {
	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newUser.password, salt, (error, hash) => {
			if (error) {
				throw error;
			}

			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

UserSchema.statics.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (error, isMatch) => {
		if (error) {
			throw error;
		}
		callback(null, isMatch);
	});
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
