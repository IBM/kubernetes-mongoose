/*eslint no-console: "off"  */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const assert = require("assert");
const fs = require("fs");
const cors = require("cors");

const Booths = require("./models/booth");
const Beacons = require("./models/beacon");
const Events = require("./models/event");

const mongoDbUrl = process.env.MONGODB_URL;

let ca;
if (process.env.MONGODB_CERT_BASE64) {
  ca = new Buffer(process.env.MONGODB_CERT_BASE64, "base64");
} else {
  ca = [fs.readFileSync("/etc/ssl/mongo.cert")];
}

let mongoDbOptions = {
  mongos: {
    useMongoClient: true,
    ssl: true,
    sslValidate: true,
    sslCA: ca,
  },
};

mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("open", function(err) {
  console.log("CONNECTED...");
  assert.equal(null, err);
});

mongoose.connect(mongoDbUrl, mongoDbOptions);

app.use(cors());

app.use(require("body-parser").json());

app.use(express.static(__dirname + "/public"));


app.get("/booth", function(req, res) {
  res.sendFile(__dirname + "/public/addBooth.html");
});

app.get("/beacon", function(req, res) {
  res.sendFile(__dirname + "/public/addBeacon.html");
});

app.get("/event", function(req, res) {
  res.sendFile(__dirname + "/public/addEvent.html");
});

// endpoints for booth
app.post("/add_booth", function(req, res) {
  // JSON in req.body
  // Insert input validation
  let addBooth = new Booths(req.body);
  addBooth.save(function(err) {
    if (err) {
      res.send("Error saving: " + err);
      return console.error(err);
    } else {
      res.send("Saved booth.");
    }
  });
});

app.get("/get_booths", function(req, res) {
  Booths.find(function(err, booths) {
    if (err) {
      res.send("Error getting booths: " + err);
      return console.error(err);
    } else {
      res.send(booths);
    }
  });
});

app.get("/get_booth/:boothId", function(req, res) {
  Booths.findOne(req.params, function(err, booth) {
    if (err) {
      res.send("Error getting booth: " + err);
      return console.error(err);
    } else if (booth) {
      res.send(booth);
    } else {
      res.send("Booth not found...");
    }
  });
});

// endpoints for beacon
app.post("/add_beacon", function(req, res) {
  // JSON in req.body
  // Insert input validation
  let addBeacon = new Beacons(req.body);
  addBeacon.save(function(err) {
    if (err) {
      res.send("Error saving: " + err);
      return console.error(err);
    } else {
      res.send("Saved beacon.");
    }
  });
});

app.get("/get_beacons", function(req, res) {
  Beacons.find(function(err, beacons) {
    if (err) {
      res.send("Error getting beacons: " + err);
      return console.error(err);
    } else {
      res.send(beacons);
    }
  });
});

app.get("/get_beacon/:beaconId", function(req, res) {
  Beacons.findOne(req.params, function(err, beacon) {
    if (err) {
      res.send("Error getting beacon: " + err);
      return console.error(err);
    } else if (beacon) {
      res.send(beacon);
    } else {
      res.send("Beacon not found...");
    }
  });
});


// {"event":"index",
// "location":"san francisco",
// "start date":"Feb 20, 2018",
// "end date": "Feb 24, 2018",
// "map":[{booth},{booth}],
// "beacons":[]}

// endpoints for event
app.post("/add_event", function(req, res) {
  // JSON in req.body
  // Insert input validation
  let boothIds = req.body.map;
  let beaconIds = req.body.beacons;
  console.log("req.body.map = " + boothIds);

  let queryBooth = Booths.find({"boothId": {$in: boothIds}},
    function(err, booths) {
      if (err) {
        res.send("Error getting booths: " + err);
        return console.error(err);
      } else {
        req.body.map = booths;
      }
    });

  const queryBeacon = Beacons.find({"beaconId": {$in: beaconIds}},
    function(err, beacons) {
      if (err) {
        res.send("Error getting beacons: " + err);
        return console.error(err);
      } else {
        req.body.beacons = beacons;
      }
    });

  queryBooth.then(queryBeacon)
    .then(function() {
      console.log(req.body);
      let addEvent = new Events(req.body);
      addEvent.save(function(err) {
        if (err) {
          res.send("Error saving: " + err);
          return console.error(err);
        } else {
          res.send("Saved event.");
        }
      });
    });
});

app.get("/get_events", function(req, res) {
  Events.find(function(err, events) {
    if (err) {
      res.send("Error getting events: " + err);
      return console.error(err);
    } else {
      res.send(events);
    }
  });
});

app.get("/get_event/:eventId", function(req, res) {
  Events.findOne(req.params, function(err, event) {
    if (err) {
      res.send("Error getting event: " + err);
      return console.error(err);
    } else if (event) {
      res.send(event);
    } else {
      res.send("Event not found...");
    }
  });
});

// render data
app.get("/booth/list", function(req, res) {
  let boothList = "";
  Booths.find(function(err, booths) {
    if (err) {
      res.send("Error getting booths: " + err);
      return console.error(err);
    } else {
      for (let boothIndex in booths) {
        let boothId = "<p>Booth ID: "
        + booths[boothIndex].boothId + "</p>";
        let unit = "<p>Booth Unit: "
        + booths[boothIndex].unit + "</p>";
        let description = "<p>Booth Description: "
        + booths[boothIndex].description + "</p>";
        let measurementUnit = "<p>Measurement Unit: "
        + booths[boothIndex].measurementUnit + "</p>";
        let xDimension = "<p>Length: "
        + booths[boothIndex].xDimension + "</p>";
        let yDimension = "<p>Width: "
        + booths[boothIndex].yDimension + "</p>";
        let x = "<p>X-coordinate: "
        + booths[boothIndex].x + "</p>";
        let y = "<p>Y-coordinate: "
        + booths[boothIndex].y + "</p>";
        let contact = "<p>Contact Person: " + booths[boothIndex].contact
        + "</p><p>===============</p>";
        let compiled = boothId + unit + description + measurementUnit
        + xDimension + yDimension + x + y + contact;
        boothList += compiled;
      }
      res.send(htmlTemplate(boothList));
    }
  });
});

app.get("/beacon/list", function(req, res) {
  let beaconList = "";
  Beacons.find(function(err, beacons) {
    if (err) {
      res.send("Error getting beacons: " + err);
      return console.error(err);
    } else {
      for (let beaconIndex in beacons) {
        let beaconId = "<p>Beacon ID: " + beacons[beaconIndex].beaconId
        + "</p>";
        let x = "<p>X-coordinate: " + beacons[beaconIndex].x + "</p>";
        let y = "<p>Y-coordinate: " + beacons[beaconIndex].y + "</p>";
        let minCount = "<p>Minimum Count: " + beacons[beaconIndex].minCount
        + "</p>";
        let maxCount = "<p>Maximum Count: " + beacons[beaconIndex].maxCount
        + "</p><p>===============</p>";
        let compiled = beaconId + x + y + minCount + maxCount;
        beaconList += compiled;
      }
      res.send(htmlTemplate(beaconList));
    }
  });
});

/**
 * Forms html for booth list
 * @param {String} list contains the html for booths.
 * @return {String} an html
 */
function htmlTemplate(list) {
  let html = "<html> \n" +
  "<head> \n" +
  "<title>Lists</title> \n" +
  "</head> \n" +
  "<body> \n" +
  "<a href='/'>Home</a> / <a href='/booth'>Add Booth</a> " +
  "/ <a href='/beacon'>" + "Add Beacon</a> " +
  "/ <a href='/event'>Add Event</a> \n" +
  "/ <a href='/booth/list'>Booth List</a> / " +
  "<a href='/beacon/list'>Beacon List</a> / " +
  "<a href='/event/list'>Event List</a><br /> \n" +
  "Hello, Lists! <p>===============</p>" + list +
  "</body> \n" +
  "</html> \n";

  return html;
}

/**
 * Forms an SVG
 * @param {String} content contains the SVG shapes. rectTemplate.
 * @return {String} an SVG in xml format
 */
function svgTemplate(content) {
  let svg = "<svg width=\"100%\" height=\"100%\">" + content + "</svg>";
  return svg;
}

/**
 * Forms a rect tag for SVG
 * @param {String} x The x location.
 * @param {String} y The y location.
 * @param {String} width The width of rectangle.
 * @param {String} height The height of rectangle.
 * @return {String} the complete rectangle tag for SVG.
 */
function rectTemplate(x, y, width, height) {
  let rect = "<rect x='" + x + "' y='" + y + "' width='" +
   width + "' height='" + height + "' />";
  return rect;
}

app.get("/svg/:eventId", function(req, res) {
  let scale = 10;
  Events.findOne(req.params, function(err, event) {
    if (err) {
      res.send("Error getting event: " + err);
      return console.error(err);
    } else if (event) {
      let svgContent = "";
      for (let boothIndex = 0; boothIndex < event.map.length; boothIndex++) {
        svgContent += rectTemplate(event.map[boothIndex].x*scale,
          event.map[boothIndex].y*scale,
          event.map[boothIndex].xDimension*scale,
          event.map[boothIndex].yDimension*scale);
      }
      res.send(svgTemplate(svgContent));
    } else {
      res.send("Event not found...");
    }
  });
});

let port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
