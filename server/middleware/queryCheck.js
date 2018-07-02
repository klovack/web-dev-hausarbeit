function queryCheck(req, res, next) {
	if (!req.query.json) {
		return res.redirect("/");
	}
	if (!req.query.count || isNaN(Number(req.query.count)) || Number(req.query.count) < 0) {
		req.query.count = 0;
	}
	if (!req.query.page || isNaN(Number(req.query.count)) || Number(req.query.count) < 0) {
		req.query.page = 0;
	}
	return next();
}

module.exports = queryCheck;
