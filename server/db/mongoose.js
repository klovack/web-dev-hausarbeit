const mongoose = require("mongoose");

// Connection URL
const url = "mongodb://webdev2018:abc123@ds263640.mlab.com:63640/webdev2018";

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = { mongoose };
