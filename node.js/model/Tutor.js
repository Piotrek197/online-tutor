const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
  firstname: {
    type: String,
    reuired: true
  },
  lastname: {
    type: String,
    reuired: true
  }
});

module.exports = mongoose.model("Tutor", tutorSchema);
