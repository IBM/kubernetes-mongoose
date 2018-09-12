#!/bin/bash

curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B01", "x" : 2, "y" : 5, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add
curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B02", "x" : 11, "y" : 4, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add
curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B03", "x" : 19, "y" : 20, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add
curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B04", "x" : 10, "y" : 11, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add

curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A01", "unit" : "Node", "description" : "Node description", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 3, "height" : 3, "x" : 0, "y" : 0}, "contact" : "John Doe" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A02", "unit" : "MongoDB", "description" : "MongoDB is not a relational database", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 5, "height" : 4, "x" : 16, "y" : 1}, "contact" : "Mary Jane" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A03", "unit" : "Swift", "description" : "Swift is not just for iOS", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 6, "height" : 2, "x" : 6, "y" : 4}, "contact" : "Jane Doe" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A04", "unit" : "VR", "description" : "Virtual Reality is growing", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 9, "height" : 7, "x" : 4, "y" : 8}, "contact" : "Smith John" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A05", "unit" : "Watson", "description" : "IBM Watson.", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 3, "height" : 5, "x" : 16, "y" : 8}, "contact" : "Catherine May" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A06", "unit" : "Info", "description" : "Information Booth", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 7, "height" : 3, "x" : 11, "y" : 17}, "contact" : "Ben Jerry" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A07", "unit" : "IBM Cloud", "description" : "Used to be called Bluemix", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 4, "height" : 4, "x" : 3, "y" : 17}, "contact" : "Joe Myers" }' "$1"/booths/add
sleep 1s
curl -X POST -H 'Content-type: application/json' -d '{ "eventId" : "index", "eventName" : "Index", "location" : "San Francisco", "x" : 21, "y" : 21,"startDate" : "2018-02-20T00:00:00Z", "endDate" : "2018-02-24T00:00:00Z", "beacons" : ["B01","B02","B03","B04"], "map" : ["A01","A02","A03","A04","A05","A06","A07"] }' "$1"/events/add

curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B11", "x" : 2, "y" : 5, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add
curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B12", "x" : 11, "y" : 4, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add
curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B13", "x" : 19, "y" : 20, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add
curl -X POST -H 'Content-type: application/json' -d '{ "beaconId" : "B14", "x" : 10, "y" : 11, "minCount" : 1, "maxCount" : 100 }' "$1"/beacons/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A11", "unit" : "Node", "description" : "Node description", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 10, "height" : 5, "x" : 1, "y" : 1}, "contact" : "John Doe" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A12", "unit" : "MongoDB", "description" : "MongoDB is not a relational database", "measurementUnit" : "metre", "shape" : {"type": "rectangle", "width" : 5, "height" : 35, "x" : 40, "y" : 1}, "contact" : "Mary Jane" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A13", "unit" : "Swift", "description" : "Swift is not just for iOS", "measurementUnit" : "metre", "shape" : {"type": "circle", "radius" : 3, "cx" : 6, "cy" : 15}, "contact" : "Jane Doe" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A14", "unit" : "VR", "description" : "Virtual Reality is growing", "measurementUnit" : "metre", "shape" : {"type": "ellipse", "cx" : 18, "cy" : 32, "rx" : 13, "ry" : 3}, "contact" : "Smith John" }' "$1"/booths/add
curl -X POST -H 'Content-type: application/json' -d '{ "boothId" : "A15", "unit" : "Watson", "description" : "IBM Watson.", "measurementUnit" : "metre", "shape" : {"type": "polygon", "points" : "22,1 30,21 17,25 13,23"}, "contact" : "Catherine May" }' "$1"/booths/add
sleep 1s
curl -X POST -H 'Content-type: application/json' -d '{ "eventId" : "think", "eventName" : "Think", "location" : "Las Vegas", "x" : 46, "y" : 37, "startDate" : "2018-03-19T00:00:00Z", "endDate" : "2018-03-22T00:00:00Z", "beacons" : ["B11","B12","B13","B14"], "map" : ["A11","A12","A13","A14","A15"] }' "$1"/events/add