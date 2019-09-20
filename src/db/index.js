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

// create - post
const insertDocuments = function () {
    client.connect(err => {
        assert.equal(null, err);
        console.log('connected to DB');
        // get db
        const db = client.db(dbName);

        // get the collection
        const collection = db.collection('inserts');

        // insert stuff
        collection.insertMany([
            {name: 'kenh14', url: 'kenh14.vn'},
            {name: 'Simple', url: 'idvl.com'}], function (err, result) {
            // result: the object returned

            assert.equal(err, null);
            assert.equal(2, result.result.n);
            assert.equal(2, result.ops.length);

            console.log("hihihi");
            client.close();
        })
    });
}

const newInsert = function () {
    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        // Insert a single document
        db.collection('inserts').insertOne({a:1}, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);

            // Insert multiple documents
            db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
                assert.equal(null, err);
                assert.equal(2, r.insertedCount);

                console.log("haha")
                client.close();
            });
        });
    });
}

// read - get
const findDocuments = function (db, callback) {
    // get the girl
    const collection = db.collection('student');

    // find stuff
    collection.find({'a': 3}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("found the following records: ");
        console.log(docs);
        callback(docs);
    })
}

// update - put
const updateDocument = function (db, callback) {
    // get the collection
    const collection = db.collection('student');

    // update a document whre a = 2, set b = 1
    collection.updateOne({a: 2}, { $set: {b: 1}}, function (err, result) {
        assert.equal(err, null);
        assert.equal(result.result.n, 1);
        console.log("update the document with a = 2");
        callback(result);
    })

}

const newUpdate = function () {
    client.connect(err => {
        assert.equal(null, err);
        console.log("Connected to db")

        const db = client.db(dbName);
        const collection = db.collection('updates');

        collection.insertMany([{a: 1}, {a: 2}, {a:2}],
            function (err, result) {
                // Insert first
                assert.equal(err, null);
                assert.equal(result.insertedCount, 3);

                collection.updateOne({a: 1}, {$set: {a:10}}, function (err, r) {
                    assert.equal(err, null);
                    assert.equal(r.matchedCount, 1);
                    assert.equal(r.modifiedCount, 1);

                    collection.updateMany({a: 2}, {$set: {b:1}}, function (err,r) {
                        assert.equal(err, null);
                        assert.equal(r.matchedCount, 12);
                        assert.equal(r.modifiedCount, 2)

                        collection.updateMany({a:3}, {$set: {b:20}}, {upsert: true}, function (err, r) {
                            assert.equal(err, null);
                            assert.equal(r.matchedCount, 0);
                            assert.equal(r.upsertedCount, 1);

                            client.close();
                        })
                    })
                })

            })
    })


}

// delete - delete
const removeDocument = function (db, callback) {
    // get the collection
    const collection = db.collection('student')

    // remove stuff
    collection.deleteMany({}, function (err, result) {
        assert.equal(err, null)

        // assert.equal(result.result.n, 1);
        console.log("removed some records");

        callback(result);
    })

}

// index
const indexCollection = function (db, callback) {
    db.collection('collection').createIndex(
        {'name': 1},
        null,
        function (err, result) {
            assert.equal(err, null);

            console.log(result);
            callback();

        }
    )
}

function getClient() {
    return db
}

module.exports = {
    client: getClient,
    initDB,
    insertDocuments,
    newInsert,
    updateDocument,
    newUpdate,
    removeDocument,
    findDocuments,
    indexCollection
}