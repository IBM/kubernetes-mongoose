const express = require("express");
const router = express.Router();

const Beacons = require("../models/beacon");
const Booths = require("../models/booth");
const Events = require("../models/event");

// endpoints for event
router.post("/add", function(req, res) {
  // JSON in req.body
  // Insert input validation
  let boothIds = req.body.map;
  let beaconIds = req.body.beacons;
  console.log(boothIds);
  console.log(beaconIds);

  Booths.find({"boothId": {$in: boothIds}},
    function(err, booths) {
      if (err) {
        console.log("error in booth query");
        res.send(err);
      } else {
        req.body.map = booths;
        Beacons.find({"beaconId": {$in: beaconIds}},
          function(err, beacons) {
            if (err) {
              console.log("error in beacon query");
              res.send(err);
            } else {
              req.body.beacons = beacons;

              let addEvent = new Events(req.body);
              addEvent.save(function(err) {
                if (err) {
                  console.log(req.body);
                  console.log("error in add event");
                  res.send(err);
                } else {
                  res.send("Saved event.");
                }
              });

            }
          });
      }
    });
});

router.get("/", function(req, res) {
  Events.find(function(err, events) {
    if (err) {
      res.send(err);
    } else {
      res.send(events);
    }
  });
});

router.get("/:eventId", function(req, res) {
  Events.findOne(req.params, function(err, event) {
    if (err) {
      res.send(err);
    } else if (event) {
      res.send(event);
    } else {
      res.send("Event not found...");
    }
  });
});

module.exports = router;
