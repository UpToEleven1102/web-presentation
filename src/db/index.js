const MongoClient = require('mongodb').MongoClient;
const uri = require('../../config/keys').mongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
let db = null;

function init_db() {
    db = 'not nll'
    client.connect(err => {
        if (err) {
            console.log('failed to connect to DB', err);
        } else {
            console.log('connected to DB');
            // get db
            db = client.db('web-presentation');
        }
    });
}

function getClient() {
    return db
}

// ─────────── Routes ────────────
module.exports = {
    client: getClient,
    init_db: init_db
}
