const MongoClient = require('mongodb').MongoClient;
const uri = require('../../config/keys').mongoURI;
const assert = require('assert');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
let db = null;
const dbName = 'web-presentation'


function initDB() {
    client.connect(err => {
        if (err) {
            console.log('failed to connect to DB', err);
        } else {
            console.log('connected to DB');
            // get db
            const db = client.db(dbName);

        }
    });
}

function getClient() {
    return db
}

module.exports = {
    client: getClient,
    initDB,
}