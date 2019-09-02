const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')

const app = express();

// ─────────── DATABASE ────────────
const uri = require('../config/keys').mongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
let db = null;

// ─────────── Routes ────────────
client.connect(err => {
    if (err) {
        console.log('failed to connect to DB', err);
    }
    else {
        console.log('connected to DB');
        // get db
        db = client.db('web-presentation');
        client.close();
    }
});

app.get('/', function (req, res) {
    // responds for requests to the root URL (/)
    res.send('Hello September!');
});
// ─────────── #3 ────────────

app.use(express.json())
// ─────────── Methods ────────────
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/ping', function(req, res) {
    res.send('pong')
})

app.post('/echo', function (req, res) {
    const data = req.body;
    console.log('received' , data)
    res.send(data)
})

app.post('/students', function(req, res) {
    // students submit info
    // save to mongo
    res.send('Not implemented')
});

app.get('/students', function (req, res) {
    // get urls from mongo
    const students = db.collection('student')
    const result = students.find({}).limit(100).next((err, doc) => {
        res.send(doc)
    })
})

// use websocket

// ─────────── RUN APP ────────────
const port = process.env.PORT || 3000;

app.listen(port, function () {
    // starts a server and listens on port 3000 for connections
    console.log(`server on port ${port}`);
});