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
6. [Generate Mock Data](#6-generate-mock-data)
7. [Perform API Requests](#7-perform-api-requests)

### 1. Clone the repo

Clone the `kubernetes-mongoose` locally. In a terminal, run:

```
$ git clone https://github.com/IBM/kubernetes-mongoose
```

### 2. Create Compose for MongoDB service with IBM Cloud

Create the following service:

* [**Compose for MongoDB**](https://console.bluemix.net/catalog/services/compose-for-mongodb)


### 3. Build your images _(optional)_

You can choose to build your own images, or use the default one in the `map-api.yaml`.

```
$ cd containers/map-api
$ docker build -t <docker-username>/map-api:1.0 .
$ docker push <docker-username>/map-api:1.0
```

### 4. Configure Deployment files

* Copy the SSL Certificate for your MongoDB

![](/images/mongo-ssl.png)

* Encode the SSL Certificate in Base64
```
$ echo -n " <paste-ssl-certificate> " | base64
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURnVENDQW1...
```
* Put the encoded result in `mongo-cert-secret.yaml`. Place it in the `mongo.cert` value.
```
...
data:
  mongo.cert: ''
```

* Get the MongoDB URL for your Compose for MongoDB.

![](/images/mongo-url.png)

* Put the URL in `map-api.yaml`. Place it in the value for `MONGODB_URL`. If you have built your own images in Step 3, change the image name `anthonyamanse/map-api:2.0` to your own.

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
map-api   172.21.138.200   169.46.YY.YY   80:31873/TCP   7d
```

Access the application on:  
`169.60.XX.XX:31873`

> Note: or if you have a load balancer, use the IP found in EXTERNAL-IP via `kubectl get svc`: `169.46.YY.YY`

### 6. Generate Mock Data

You'll notice that if you go to the `Stored Events` link in the app (or go to 169.60.XX.XX:31873/main), you would not find any Events. That is because we haven't added anything to our database yet.

Go back to the IBM Cloud Dashboard and copy the Mongo command line connection string
![](/images/mongo-command.png)

Generate mock data with the `mockdata-*.js`. The mock data contains a set of data that you'd usually find in a map. The map setting is for a conference.

* Add `mockdata-think.js` and `mockdata-index.js` at the end of the mongo command. This execute the scripts that inserts that data.

  `$ mongo --ssl --sslAllowInvalidCertificates <url> -u <user> -p <password> --authenticationDatabase admin mockdata-think.js`

  `$ mongo --ssl --sslAllowInvalidCertificates <url> -u <user> -p <password> --authenticationDatabase admin mockdata-index.js`

* Go back to your browser and view the dashboard again. `169.60.XX.XX:31873/main`. You should now see **Think** and **Index** events.
* You can click on the event to view their floorplan.

### 7. Perform API Requests

APIs for this application is listed in the front page `169.60.XX.XX:31873`.

You could test some of them using a terminal:

```
$ curl http://169.60.XX.XX:31873/beacons
<This should return a list of the beacons stored in MongoDB>

$ curl http://169.60.XX.XX:31873/booths
<This should return a list of the booths stored in MongoDB>

$ curl http://169.60.XX.XX:31873/events
<This should return a list of events stored in MongoDB>
```

To get an SVG or PDF of the floor plan of an event:  
`http://169.60.XX.XX:31873/svg/<:eventId>` add `.pdf` if you want a PDF version.
  * `http://169.60.XX.XX:31873/svg/index` _SVG_
  * `http://169.60.XX.XX:31873/svg/think.pdf` _PDF_

###


# Learn more

* **Node.js Code Patterns**: Enjoyed this Code Pattern? Check out our other [Node.js Code Patterns](https://developer.ibm.com/code/technologies/node-js/)

# License
[Apache 2.0](LICENSE)
