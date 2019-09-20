const MongoClient = require('mongodb').MongoClient;

const uri = require('../../config/keys').mongoURI;
const dbName = 'web-presentation'

function createClient() {
    return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
}

module.exports = {
    client: createClient,
    dbName: dbName
}