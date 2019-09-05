const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./db/index');

const generalRoutes = require('./routes/main')
const studentRoutes = require('./routes/students')
const presentationRoutes = require('./routes/presentations')
const itemsRoutes = require('./routes/items')

const app = express();

db.initDB();

// ─────────── Methods ────────────
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(generalRoutes)
app.use(studentRoutes)
app.use(presentationRoutes)
app.use('/items', itemsRoutes);

// use websocket
app.use('/', function (req, res) {
    res.send('Api works');
});

// ─────────── RUN APP ────────────
const port = process.env.PORT || 3000;
const server = http.createServer(app)
server.listen(port, function() {
    console.log('Listening on port ', port)
});
