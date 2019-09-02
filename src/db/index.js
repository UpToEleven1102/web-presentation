const MongoClient = require('mongodb').MongoClient;
const uri = require('../../config/keys').mongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
let db = null;

// ─────────── Routes ────────────
module.exports = function init() {
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
}
