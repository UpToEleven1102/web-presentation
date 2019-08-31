const express = require('express');
const app = express();

app.get('/', function (req, res) {
    // responds for requests to the root URL (/)
    res.send('Hello September!');
});

app.listen(3000, function () {
    // starts a server and listens on port 3000 for connections
    console.log('Listening on port 3000');
});