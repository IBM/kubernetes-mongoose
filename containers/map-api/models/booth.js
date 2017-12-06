const mongoose = require("mongoose");

// eslint-disable-next-line
let boothSchema = mongoose.Schema({
  boothId: {type: String, unique: true},
  unit: String,
  description: String,
  measurementUnit: String,
  xDimension: Number,
  yDimension: Number,
  x: Number,
  y: Number,
  contact: String,
});

module.exports = mongoose.model("Booth", boothSchema);
