const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('./db/students')
const cors = require('cors')

// db.seedStudents()

const generalRoutes = require('./routes/main')
const studentRoutes = require('./routes/students')
const scoreRoutes = require('./routes/scores')

const app = express();

// ─────────── Methods ────────────
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(generalRoutes)
app.use(studentRoutes)
app.use('/scores', scoreRoutes)

app.use('/', function (req, res) {
    res.status(200).send('Api works');
});

// ─────────── RUN APP ────────────
const port = process.env.PORT || 3000;
const server = http.createServer(app)
server.listen(port, function() {
    console.log('Listening on port ', port)
});
