
function getStudents() {
    // use db from index.js to query data from mongodb
    // get urls from mongo
    // const students = db.collection('student')
    // const result = students.find({}).limit(100).next((err, doc) => {
    //     res.send(doc)
    // })
    const data = [
        {id: 1, title: 'Finalize project',          order: 1, completed: false, createdOn: new Date()},
        {id: 2, title: 'Book ticket to London',     order: 2, completed: false, createdOn: new Date()},
        {id: 3, title: 'Finish last article',       order: 3, completed: false, createdOn: new Date()},
        {id: 4, title: 'Get a new t-shirt',         order: 4, completed: false, createdOn: new Date()},
        {id: 5, title: 'Create dinner reservation', order: 5, completed: false, createdOn: new Date()},
    ]

    return data
}

function getStudentByID(id) {

}

function postStudent(student) {

}

module.exports = {
    getStudents: getStudents,
    postStudent: postStudent,
    getStudentByID: getStudentByID,
}


