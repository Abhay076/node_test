const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  sub_total: {
    type: String,
    trim: true,
    required: true,
  },
  phone_number: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Todo", TodoSchema);
