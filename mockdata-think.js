/*global db:false ISODate:false */
db.beacons.insert({ "beaconId" : "B11", "x" : 2, "y" : 5, "minCount" : 1, "maxCount" : 100 });
db.beacons.insert({ "beaconId" : "B12", "x" : 11, "y" : 4, "minCount" : 1, "maxCount" : 100 });
db.beacons.insert({ "beaconId" : "B13", "x" : 19, "y" : 20, "minCount" : 1, "maxCount" : 100 });
db.beacons.insert({ "beaconId" : "B14", "x" : 10, "y" : 11, "minCount" : 1, "maxCount" : 100 });
db.booths.insert({ "boothId" : "A11", "unit" : "Node", "description" : "Node description", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 10, "height" : 5, "x" : 1, "y" : 1}, "contact" : "John Doe" });
db.booths.insert({ "boothId" : "A12", "unit" : "MongoDB", "description" : "MongoDB is not a relational database", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 5, "height" : 35, "x" : 40, "y" : 1}, "contact" : "Mary Jane" });
db.booths.insert({ "boothId" : "A13", "unit" : "Swift", "description" : "Swift is not just for iOS", "measurementUnit" : "metre", "shape" : {"type": "circle", "radius" : 3, "cx" : 6, "cy" : 15}, "contact" : "Jane Doe" });
db.booths.insert({ "boothId" : "A14", "unit" : "VR", "description" : "Virtual Reality is growing", "measurementUnit" : "metre", "shape" : {"type": "ellipse", "cx" : 18, "cy" : 32, "rx" : 13, "ry" : 3}, "contact" : "Smith John" });
db.booths.insert({ "boothId" : "A15", "unit" : "Watson", "description" : "IBM Watson.", "measurementUnit" : "metre", "shape" : {"type": "polygon", "points" : "22,1 30,21 17,25 13,23"}, "contact" : "Catherine May" });
db.events.insert({ "eventId" : "think", "eventName" : "Think", "location" : "Las Vegas", "x" : 46, "y" : 37, "startDate" : ISODate("2018-03-19T00:00:00Z"), "endDate" : ISODate("2018-03-22T00:00:00Z"), "beacons" : [], "map" : [] });

let booths = db.booths.find({"boothId": {$in: ["A11","A12","A13","A14","A15"]}}).toArray();
let beacons = db.beacons.find({"beaconId": {$in: ["B11","B12","B13","B14"]}}).toArray();

db.events.update({eventId: "think"}, {$set: {"beacons": beacons, "map": booths}});
