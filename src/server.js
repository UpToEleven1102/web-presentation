const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')

const server = express();

const uri = require('../config/keys').mongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

let db = null;

// documentation : http://mongodb.github.io/node-mongodb-native/3.3/tutorials/crud/

client.connect(err => {
    if (err) {
        console.log('failed to connect to DB', err);
    }
    else {
        console.log('connected to DB');
        db = client.db('web-presentation');
        client.close();
    }
});

server.get('/', function (req, res) {
    // responds for requests to the root URL (/)
    res.send('Hello September!');
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.post('/ping', function(req, res) {
    res.send('pong')
})

server.post('/echo', function (req, res) {
    const data = req.body;
    console.log('received' , data)
    res.send(data)
})

server.post('/students', function(req, res) {
    // students submit info
    // save to mongo
    res.send('Not implemented')
})

server.get('/students', function (req, res) {
    // get urls from mongo
    const students = db.collection('student')
    const result = students.find({}).limit(100).next((err, doc) => {
        res.send(doc)
    })
})

// use websocket

const port = process.env.PORT || 3000;

server.listen(port, function () {
    // starts a server and listens on port 3000 for connections
    console.log(`server on port ${port}`);
});