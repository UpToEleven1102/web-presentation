const db = require('./index')

let data = [
    {id: 1, name: 'Huyen', avatar: 'https://source.unsplash.com/random/1', image: 'https://source.unsplash.com/random/1', url: 'github.com'},
    {id: 2, name: 'Dang', avatar: 'https://source.unsplash.com/random/1', image: 'https://source.unsplash.com/random/2', url: 'github.com'}
]

function getStudents() {
    // use db from index.js to query data from mongodb
    // get urls from mongo
    // const students = db.collection('student')
    // const result = students.find({}).limit(100).next((err, doc) => {
    //     res.send(doc)
    // })
    // if (!db.client) {
    //     console.log('client', db.init_db())
    // }
    return data
}

function getStudentByID(id) {
    return data.filter(e => e.id === id)
}

function postStudent(student) {
    data = [...data, student]
}

function putStudent(id, student) {
    console.log('putting student - id: ', id, 'student ', student)
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

module.exports = {
    getStudents: getStudents,
    postStudent: postStudent,
    putStudent: putStudent,
    getStudentByID: getStudentByID,
}


