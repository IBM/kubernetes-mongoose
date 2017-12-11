[![Build Status](https://travis-ci.org/IBM/kubernetes-mongoose.svg?branch=master)](https://travis-ci.org/IBM/kubernetes-mongoose)

# Create a Map Server with MongoDB and Mongoose
In this Code Pattern, we will create a map server using MongoDB and Mongoose. The map server is a Node.js app using the mongoose framework. The map server will be used as a backend for a dashboard. The dashboard will show the booths and draw a map for the user.

When the reader has completed this Code Pattern, they will understand how to:

* Implement Mongoose with NodeJS
* Serve the data with Express as REST APIs

<!--Remember to dump an image in this path-->
![](/images/mongo-architecture.png)

## Flow
1. A MongoDB is set up. Compose for MongoDB is used in this pattern.
2. User adds in mock data that matches the schema of the app.
3. User interacts with the deployed app via its APIs

## Included components
* [Compose for MongoDB](https://console.bluemix.net/catalog/services/compose-for-mongodb): MongoDB with its powerful indexing and querying, aggregation and wide driver support, has become the go-to JSON data store for many startups and enterprises.
* [Kubernetes Cluster](https://console.bluemix.net/containers-kubernetes/catalogCluster): Create and manage your own cloud infrastructure and use Kubernetes as your container orchestration engine.

## Featured technologies
* [Mongoose](http://mongoosejs.com/): A JavaScript framework that serves as a MongoDB object modeling tool.
* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [Databases](https://en.wikipedia.org/wiki/IBM_Information_Management_System#.22Full_Function.22_databases): Repository for storing and managing collections of data.

# Prerequisite

Create a Kubernetes cluster with either [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube) for local testing, or with [IBM Bluemix Container Service](https://github.com/IBM/container-journey-template/blob/master/README.md) to deploy in cloud. The code here is regularly tested against [Kubernetes Cluster from Bluemix Container Service](https://console.ng.bluemix.net/docs/containers/cs_ov.html#cs_ov) using Travis.

Install [Docker](https://www.docker.com) by following the instructions [here](https://www.docker.com/community-edition#/download) for your preferrerd operating system. You would need docker if you want to build and use your own images.

# Steps

1. [Clone the repo](#1-clone-the-repo)
2. [Create Compose for MongoDB service with IBM Cloud](#2-create-compose-for-mongodb-service-with-ibm-cloud)
3. [Build your images](#3-build-your-images)
4. [Configure Deployment files](#4-configure-deployment-files)
5. [Deploy the application](#5-deploy-the-application)

### 1. Clone the repo

Clone the `kubernetes-mongoose` locally. In a terminal, run:

```
$ git clone https://github.com/IBM/kubernetes-mongoose
```

### 2. Create Compose for MongoDB service with IBM Cloud

Create the following service:

* [**Compose for MongoDB**](https://console.bluemix.net/catalog/services/compose-for-mongodb)

Copy the Mongo command line connection string
![](/images/mongo-command.png)

Generate mock data with the `mockdata.js`. The mock data contains a set of data that you'd usually find in a map. The map setting is for a conference.

Add `mockdata.js` at the end of the mongo command. This execute the scripts that inserts that data.
```
$ mongo --ssl --sslAllowInvalidCertificates <url> -u <user> -p <password> --authenticationDatabase admin mockdata.js
```

### 3. Build your images _(optional)_

You can choose to build your own images, or use the default one stated in the `map-api.yaml`.

```
$ cd containers/map-api
$ docker build -t <docker-username>/map-api:1.0 .
$ docker push <docker-username>/map-api:1.0
```

### 4. Configure Deployment files

Copy the SSL Certificate for your MongoDB

![](/images/mongo-ssl.png)

Encode the SSL Certificate in Base64
```
$ echo -n " <paste-ssl-certificate> " | base64
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURnVENDQW1...
```
Put the encoded result in `mongo-cert-secret.yaml`. Place it in the `mongo.cert` value.
```
...
data:
  mongo.cert: ''
```

Get the MongoDB URL for your Compose for MongoDB.

![](/images/mongo-url.png)

Put the URL in `map-api.yaml`. Place it in the value for `MONGODB_URL`.

> If you have built your own images in Step 3, change the image name to your own.

```
...
containers:
  - image: anthonyamanse/map-api:2.0
    name: map-api
    env:
      - name: MONGODB_URL
        value: ''
...
```
### 5. Deploy the application

After modifying the YAML configuration files. You can now use them with `kubectl` command.

* Create a Secret resource for the SSL certificate.
```
$ kubectl apply -f mongo-cert-secret.yaml
```

* Create the Deployment and service resource for the application.
```
$ kubectl apply -f map-api.yaml
```

* To check if the Pods are deployed and running.
```
$ kubectl get pods
NAME                                       READY     STATUS    RESTARTS   AGE
map-api-deployment-4132200164-k5s3c        1/1       Running   0          1m
```

* To access your application, you would need the Public IP of your cluster's worker and the NodePort of the Service resource of your application.
```
$ bx cs workers <cluster-name>
OK
ID                                                 Public IP      Private IP       Machine Type   State    Status   Version   
kube-dal10-crbbdb1ff6a36846e9b2dfb522a07005af-w1   169.60.XX.XX   10.177.184.196   b1c.16x64      normal   Ready    1.7.4_1502*

$ kubectl get svc map-api
NAME      CLUSTER-IP       EXTERNAL-IP     PORT(S)        AGE
map-api   172.21.138.200   169.46.XX.XXX   80:31873/TCP   7d
```

Access the application on:
`169.60.XX.XX:31873`

Some of the APIs of the server:
* Get Beacons
```
$ curl -x http://169.46.74.117/get_beacons
[{"_id":"5a1ddb51efe299e4d112f9ea","beaconId":"B01","x":2,"y":5,"minCount":1,"maxCount":100,"__v":0},{"_id":"5a1ddb88efe299e4d112f9eb","beaconId":"B02","x":11,"y":4,"minCount":1,"maxCount":100,"__v":0},{"_id":"5a1ddb94efe299e4d112f9ec","beaconId":"B03","x":19,"y":20,"minCount":1,"maxCount":100,"__v":0},{"_id":"5a1ddbb9efe299e4d112f9ed","beaconId":"B04","x":10,"y":11,"minCount":1,"maxCount":100,"__v":0}]
```
* Get Booths
```
$ curl -x http://169.46.74.117/get_booths
[{"_id":"5a1dd603efe299e4d112f9e3","boothId":"A01","unit":"Node","description":"Node description","measurementUnit":"metre","xDimension":3,"yDimension":3,"x":0,"y":0,"contact":"John Doe","__v":0},{"_id":"5a1dd7b6efe299e4d112f9e4","boothId":"A02","unit":"MongoDB","description":"MongoDB is not a relational database","measurementUnit":"metre","xDimension":5,"yDimension":4,"x":16,"y":1,"contact":"Mary Jane","__v":0},{"_id":"5a1dd853efe299e4d112f9e5","boothId":"A03","unit":"Swift","description":"Swift is not just for iOS","measurementUnit":"metre","xDimension":6,"yDimension":2,"x":6,"y":4,"contact":"Jane Doe","__v":0},{"_id":"5a1dd893efe299e4d112f9e6","boothId":"A04","unit":"VR","description":"Virtual Reality is growing","measurementUnit":"metre","xDimension":9,"yDimension":7,"x":4,"y":8,"contact":"Smith John","__v":0},{"_id":"5a1dd8c1efe299e4d112f9e7","boothId":"A05","unit":"Watson","description":"IBM Watson.","measurementUnit":"metre","xDimension":3,"yDimension":5,"x":16,"y":8,"contact":"Catherine May","__v":0},{"_id":"5a1dd8e5efe299e4d112f9e8","boothId":"A06","unit":"Info","description":"Information Booth","measurementUnit":"metre","xDimension":7,"yDimension":3,"x":11,"y":17,"contact":"Ben Jerry","__v":0},{"_id":"5a1dd920efe299e4d112f9e9","boothId":"A07","unit":"IBM Cloud","description":"Used to be called Bluemix","measurementUnit":"metre","xDimension":4,"yDimension":4,"x":3,"y":17,"contact":"Joe Myers","__v":0}]
```
* Get Events
```
$ curl -x http://169.46.74.117/get_events
[{"_id":"5a1de316b46012e66d473a8a","eventId":"E01","eventDescription":"Index","location":"San Francisco","startDate":"2018-02-20T00:00:00.000Z","endDate":"2018-02-24T00:00:00.000Z","__v":0,"beacons":[{"__v":0,"maxCount":100,"minCount":1,"y":5,"x":2,"beaconId":"B01","_id":"5a1ddb51efe299e4d112f9ea"},{"__v":0,"maxCount":100,"minCount":1,"y":4,"x":11,"beaconId":"B02","_id":"5a1ddb88efe299e4d112f9eb"},{"__v":0,"maxCount":100,"minCount":1,"y":20,"x":19,"beaconId":"B03","_id":"5a1ddb94efe299e4d112f9ec"},{"__v":0,"maxCount":100,"minCount":1,"y":11,"x":10,"beaconId":"B04","_id":"5a1ddbb9efe299e4d112f9ed"}],"map":[{"__v":0,"contact":"John Doe","y":0,"x":0,"yDimension":3,"xDimension":3,"measurementUnit":"metre","description":"Node description","unit":"Node","boothId":"A01","_id":"5a1dd603efe299e4d112f9e3"},{"__v":0,"contact":"Mary Jane","y":1,"x":16,"yDimension":4,"xDimension":5,"measurementUnit":"metre","description":"MongoDB is not a relational database","unit":"MongoDB","boothId":"A02","_id":"5a1dd7b6efe299e4d112f9e4"},{"__v":0,"contact":"Jane Doe","y":4,"x":6,"yDimension":2,"xDimension":6,"measurementUnit":"metre","description":"Swift is not just for iOS","unit":"Swift","boothId":"A03","_id":"5a1dd853efe299e4d112f9e5"},{"__v":0,"contact":"Smith John","y":8,"x":4,"yDimension":7,"xDimension":9,"measurementUnit":"metre","description":"Virtual Reality is growing","unit":"VR","boothId":"A04","_id":"5a1dd893efe299e4d112f9e6"},{"__v":0,"contact":"Catherine May","y":8,"x":16,"yDimension":5,"xDimension":3,"measurementUnit":"metre","description":"IBM Watson.","unit":"Watson","boothId":"A05","_id":"5a1dd8c1efe299e4d112f9e7"},{"__v":0,"contact":"Ben Jerry","y":17,"x":11,"yDimension":3,"xDimension":7,"measurementUnit":"metre","description":"Information Booth","unit":"Info","boothId":"A06","_id":"5a1dd8e5efe299e4d112f9e8"},{"__v":0,"contact":"Joe Myers","y":17,"x":3,"yDimension":4,"xDimension":4,"measurementUnit":"metre","description":"Used to be called Bluemix","unit":"IBM Cloud","boothId":"A07","_id":"5a1dd920efe299e4d112f9e9"}]}]
```
These are the schema for the documents in MongoDB.
* Beacons
```
{
    beaconId: String,
    x: Number,
    y: Number,
    minCount: Number,
    maxCount: Number
}
```

* Booths
```
{
    boothId: String,
    unit: String,
    description: String,
    measurementUnit: String,
    xDimension: Number,
    yDimension: Number,
    x: Number,
    y: Number,
    contact: String
}
```

* Events
```
{
    eventId: String,
    eventDescription: String,
    location: String,
    startDate: Date,
    endDate: Date,
    map: [Booth,Booth,...],
    beacons: [Beacon,Beacon,...]
}
```

# Learn more

* **Node.js Code Patterns**: Enjoyed this Code Pattern? Check out our other [Node.js Code Patterns](https://developer.ibm.com/code/technologies/node-js/)

# License
[Apache 2.0](LICENSE)
