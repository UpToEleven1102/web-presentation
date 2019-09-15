const db = require('./index');
const scoreDB = require('./scores')

let data = [
    {id: 1, name: 'Huyen', avatar: 'https://source.unsplash.com/random/1', image: 'https://source.unsplash.com/random/1', url: 'https://en.wikipedia.org/wiki/History_of_display_technology'},
    {id: 2, name: 'Ngoc', avatar: 'https://source.unsplash.com/random/2', image: 'https://source.unsplash.com/random/2', url: 'https://en.wikipedia.org/wiki/Llangeinor'},
    {id: 3, name: 'Contigo', avatar: 'https://source.unsplash.com/random/3', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif', url: 'https://en.wikipedia.org/wiki/Gardenia_remyi'},
    {id: 4, name: 'Gardenia', avatar: 'https://source.unsplash.com/random/4', image: 'https://source.unsplash.com/random/4', url: 'https://en.wikipedia.org/wiki/Streetcars_in_Reno'},
    {id: 5, name: 'Barrett', avatar: 'https://source.unsplash.com/random/5', image: 'https://source.unsplash.com/random/5', url: 'https://en.wikipedia.org/wiki/K._K._Barrett'},

]

function getStudents() {
    data.forEach(e => {
        const avg = scoreDB.getPresenterAvgScore(e.id)
        e.score = avg ? avg : {}
    })

    return data;
}

function getStudentByID(id) {
    return data.filter(e => e.id === id)
}

function postStudent(student) {
    console.log('post student', student)
    data = [...data, student]
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

module.exports = {
    data: data,
    getStudents: getStudents,
    postStudent: postStudent,
    putStudent: putStudent,
    getStudentByID: getStudentByID,
}


