//Set up mongoose connection
const mongoose = require("mongoose");
// const mongoDB = 'mongodb://localhost/node_rest_api';
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
module.exports = mongoose;
