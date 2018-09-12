const express = require("express");
const app = express();
const mongoose = require("mongoose");
const assert = require("assert");
const cors = require("cors");

const beaconRoute = require("./routes/beacons");
const boothRoute = require("./routes/booths");
const eventRoute = require("./routes/events");
const svgRoute = require("./routes/svg");
const renderRoute = require("./routes/renderSvg");

const mongoDbUrl = process.env.MONGODB_URL;

let mongoDbOptions = {
  // ssl: true,
  // sslValidate: true,
  useNewUrlParser: true
};

mongoose.set('useCreateIndex',true);
mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("open", function(err) {
  console.log("CONNECTED...");
  assert.equal(null, err);
});

if (process.env.UNIT_TEST == "test") {
  mongoose.connect("mongodb://localhost/myapp");
}
else {
  mongoose.connect(mongoDbUrl, mongoDbOptions);
}

app.use(require("body-parser").json());
app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.use("/main", renderRoute);
app.use("/beacons", beaconRoute);
app.use("/booths", boothRoute);
app.use("/events", eventRoute);
app.use("/svg", svgRoute.main);

let port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

module.exports = app;