const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { User } = require("../models/user");
const config = require("./config");

module.exports = function (passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
	opts.secretOrKey = config.secret;

	passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
		User.findUserById(jwtPayload.data._id, (error, user) => {
			if (error) {
				return done(error, false);
			}

			if (user) {
				return done(null, user);
			}
			else {
				return done(null, false);
			}
		});
	}));
};
