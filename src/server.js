const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const db = require('./db/index')

const generalRoutes = require('./routes/main')
const studentRoutes = require('./routes/students')
const presentationRoutes = require('./routes/presentations')

const app = express();

// ─────────── DATABASE ────────────
db()

app.get('/', function (req, res) {
    // responds for requests to the root URL (/)
    res.send('Hello September!');
});
// ─────────── #3 ────────────
app.use(express.json());

// ─────────── Methods ────────────
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(generalRoutes)
app.use(studentRoutes)
app.use(presentationRoutes)

// use websocket

// ─────────── RUN APP ────────────
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, function() {
    console.log('Listening on port ', port)
});
