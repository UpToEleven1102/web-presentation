const fs = require('fs')
const csv = require('csv-parser');

const DB = require('./index')
const dbName = require('./index').dbName
const scoreDB = require('./scores')

async function getStudents(filter = {}) {
    const client = DB.client()
    await client.connect();

    const db = client.db(dbName);
    const r = await db.collection('student').find(filter).toArray()
    await client.close()
    return r
}

function putStudent(id, student) {
    console.log('putting student - id: ', id, 'student ', student);
    // const client = db.client()
    // let foundStudent = client.find({name: student.name})
    let foundStudent = data.find(e => e.id === id)

    if (!foundStudent) {
        return null;
    }

    foundStudent.url = student.url
    // upsert db
    data = data.filter(e => e.name !== foundStudent.name)
    data = [...data, foundStudent]
    return foundStudent
}

async function createStudents(students) {
    try {
        const client = DB.client()
        await client.connect();

        const db = client.db(dbName);
        const r = await db.collection('student').insertMany(students)

        await client.close()

        return r.insertedIds
    } catch (err) {
        console.log(err.stack);
    }
}

async function removeStudents(filter = {}) {
    try {
        const client = DB.client()
        await client.connect();

        const db = client.db(dbName);
        const r = await db.collection('student').deleteMany(filter)
        await client.close()
        return r.deletedCount
    } catch (err) {
        console.log(err.stack);
    }
}

async function seedStudents() {
    const r = await removeStudents()
    console.log('cleared data: ', r)
    let data = []
    fs.createReadStream('src/db/presentation.csv')
        .pipe(csv())
        .on('data', (row) => {
            data.push(row)
        })
        .on('end', () => {
            createStudents(data).then(res => {
                console.log('inserted ids', res)
            })
        });
}


module.exports = {
    getStudents: getStudents,
    putStudent: putStudent,
    createStudents: createStudents,
    removeStudents: removeStudents,
    seedStudents: seedStudents
}


