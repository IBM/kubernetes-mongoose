/*global db:false ISODate:false */
db.beacons.insert({ "beaconId" : "B01", "x" : 2, "y" : 5, "minCount" : 1, "maxCount" : 100 });
db.beacons.insert({ "beaconId" : "B02", "x" : 11, "y" : 4, "minCount" : 1, "maxCount" : 100 });
db.beacons.insert({ "beaconId" : "B03", "x" : 19, "y" : 20, "minCount" : 1, "maxCount" : 100 });
db.beacons.insert({ "beaconId" : "B04", "x" : 10, "y" : 11, "minCount" : 1, "maxCount" : 100 });
db.booths.insert({ "boothId" : "A01", "unit" : "Node", "description" : "Node description", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 3, "height" : 3, "x" : 0, "y" : 0}, "contact" : "John Doe" });
db.booths.insert({ "boothId" : "A02", "unit" : "MongoDB", "description" : "MongoDB is not a relational database", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 5, "height" : 4, "x" : 16, "y" : 1}, "contact" : "Mary Jane" });
db.booths.insert({ "boothId" : "A03", "unit" : "Swift", "description" : "Swift is not just for iOS", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 6, "height" : 2, "x" : 6, "y" : 4}, "contact" : "Jane Doe" });
db.booths.insert({ "boothId" : "A04", "unit" : "VR", "description" : "Virtual Reality is growing", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 9, "height" : 7, "x" : 4, "y" : 8}, "contact" : "Smith John" });
db.booths.insert({ "boothId" : "A05", "unit" : "Watson", "description" : "IBM Watson.", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 3, "height" : 5, "x" : 16, "y" : 8}, "contact" : "Catherine May" });
db.booths.insert({ "boothId" : "A06", "unit" : "Info", "description" : "Information Booth", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 7, "height" : 3, "x" : 11, "y" : 17}, "contact" : "Ben Jerry" });
db.booths.insert({ "boothId" : "A07", "unit" : "IBM Cloud", "description" : "Used to be called Bluemix", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 4, "height" : 4, "x" : 3, "y" : 17}, "contact" : "Joe Myers" });
db.events.insert({ "eventId" : "index", "eventName" : "Index", "location" : "San Francisco", "x" : 21, "y" : 21,"startDate" : ISODate("2018-02-20T00:00:00Z"), "endDate" : ISODate("2018-02-24T00:00:00Z"), "beacons" : [], "map" : [] });

let booths = db.booths.find({"boothId": {$in: ["A01","A02","A03","A04","A05","A06","A07"]}}).toArray();
let beacons = db.beacons.find({"beaconId": {$in: ["B01","B02","B03","B04"]}}).toArray();

db.events.update({eventId: "index"}, {$set: {"beacons": beacons, "map": booths}});
