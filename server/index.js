const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/sitzungen", require("./router/sitzung"));

app.get("/", (req, res) => {
	res.redirect("/sitzungen");		// Only if logged in (Later implementation)
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
