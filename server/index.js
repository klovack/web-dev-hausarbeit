const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const yargs = require("yargs");

const sitzungRoute = require("./router/sitzung");
const userRoute = require("./router/user");

const argv = yargs
	.option("port", {
		alias: "p",
		describe: "Specified port number which server listens to. \nIf it's not specified, the server will listen to port number 3000",
		type: "number"
	})
	.argv;

const app = express();
const PORT = process.env.PORT || argv.port || 8080;

// CORS Middleware
app.use(cors());

// Static Public Folder
app.use(express.static(path.join(__dirname, "../public")));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.get("/", (req, res) => {
	res.render("index");
});

// Sitzung Route
app.use("/sitzungen", sitzungRoute);

// User Router
app.use("/users", userRoute);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
