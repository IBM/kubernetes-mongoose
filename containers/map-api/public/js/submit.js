/*global document:false alert:false XMLHttpRequest:false */

let boothButton = document.getElementById("addBooth");
let beaconButton = document.getElementById("addBeacon");
let eventButton = document.getElementById("addEvent");

if (boothButton) {
  boothButton.addEventListener("click", addBooth);
}
if (beaconButton) {
  beaconButton.addEventListener("click", addBeacon);
}
if (eventButton) {
  eventButton.addEventListener("click", addEvent);
}

/**
 * Forms JSON body and sends a POST request
 */
function addBooth() { // eslint-disable-line
  let boothId = document.getElementById("boothId").value;
  let unit = document.getElementById("unit").value;
  let description = document.getElementById("description").value;
  let measurementUnit = document.getElementById("measurementUnit").value;
  let xDimension = parseInt(document.getElementById("xDimension").value);
  let yDimension = parseInt(document.getElementById("yDimension").value);
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);
  let contact = document.getElementById("contact").value;

  let jsonBody = {
    boothId: "",
    unit: "",
    description: "",
    measurementUnit: "",
    xDimension: null,
    yDimension: null,
    x: null,
    y: null,
    contact: "",
  };

  jsonBody.boothId = boothId;
  jsonBody.unit = unit;
  jsonBody.description = description;
  jsonBody.measurementUnit = measurementUnit;
  jsonBody.xDimension = xDimension;
  jsonBody.yDimension = yDimension;
  jsonBody.x = x;
  jsonBody.y = y;
  jsonBody.contact = contact;
  alert(JSON.stringify(jsonBody));

  let xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  xmlhttp.open("POST", "/add_booth");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(jsonBody));
}

/**
 * Forms JSON body and sends a POST request
 */
function addBeacon() { // eslint-disable-line
  let beaconId = document.getElementById("beaconId").value;
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);
  let minCount = parseInt(document.getElementById("minCount").value);
  let maxCount = parseInt(document.getElementById("maxCount").value);

  let jsonBody = {
    beaconId: "",
    x: null,
    y: null,
    minCount: null,
    maxCount: null,
  };
  jsonBody.beaconId = beaconId;
  jsonBody.x = x;
  jsonBody.y = y;
  jsonBody.minCount = minCount;
  jsonBody.maxCount = maxCount;
  alert(JSON.stringify(jsonBody));

  let xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  xmlhttp.open("POST", "/add_beacon");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(jsonBody));
}

/**
 * Forms JSON body and sends a POST request
 */
function addEvent() { // eslint-disable-line
  let eventId = document.getElementById("eventId").value;
  let eventDescription = document.getElementById("eventDescription").value;
  let location = document.getElementById("location").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let map = document.getElementById("map").value;
  let mapArray = map.split(",").map(function(item) {
    return item.trim();
  });
  let beacons = document.getElementById("beacons").value;
  let beaconArray = beacons.split(",").map(function(item) {
    return item.trim();
  });

  let jsonBody = {
    eventId: "",
    eventDescription: "",
    location: "",
    startDate: null,
    endDate: null,
    map: "",
    beacons: "",
  };
  jsonBody.eventId = eventId;
  jsonBody.eventDescription = eventDescription;
  jsonBody.location = location;
  jsonBody.startDate = startDate;
  jsonBody.endDate = endDate;
  jsonBody.map = mapArray;
  jsonBody.beacons = beaconArray;
  alert(JSON.stringify(jsonBody));

  let xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  xmlhttp.open("POST", "/add_event");
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(jsonBody));
}
