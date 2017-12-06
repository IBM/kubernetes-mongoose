const mongoose = require("mongoose");

let Booths = require("../models/booth");
let Beacons = require("../models/beacon");

// eslint-disable-next-line
let eventSchema = mongoose.Schema({
  eventId: {type: String, unique: true},
  eventDescription: String,
  location: String,
  startDate: Date,
  endDate: Date,
  map: [Booths.schema],
  beacons: [Beacons.schema],
});

module.exports = mongoose.model("Event", eventSchema);
