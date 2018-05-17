const router = require("express").Router();     // eslint-disable-line

// Show all sitzung
router.get("/", (req, res) => {
	res.send("Get all sitzung");
});

// Create new sitzung
router.post("/", (req, res) => {
	res.redirect("/sitzungen");
});

// Show specific sitzung associated with the id
router.get("/:id", (req, res) => {
	const { id } = req.params;
	res.send(`Get sitzung with the id: ${id}`);
});

// Delete the sitzung associated with the id
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	res.send(`Delete sitzung with the id: ${id}`);
});

// Edit the sitzung associated with the id
router.patch("/:id", (req, res) => {
	const { id } = req.params;
	res.redirect(`/sitzungen/${id}`);
});

module.exports = router;
