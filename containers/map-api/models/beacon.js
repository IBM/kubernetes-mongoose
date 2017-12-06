const mongoose = require("mongoose");

// eslint-disable-next-line
let beaconSchema = mongoose.Schema({
  beaconId: {type: String, unique: true},
  x: Number,
  y: Number,
  minCount: Number,
  maxCount: Number,
});

module.exports = mongoose.model("Beacon", beaconSchema);
