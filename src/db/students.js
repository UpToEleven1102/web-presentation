const db = require('./index');

let data = [
    {id: 1, name: 'Huyen', avatar: 'https://source.unsplash.com/random/1', image: 'https://source.unsplash.com/random/1', url: 'https://www.cnbc.com/2018/12/07/richard-branson-daymond-john-and-others-what-they-wish-they-knew-at-25.html', presenting : true},
    {id: 2, name: 'Ngoc', avatar: 'https://source.unsplash.com/random/1', image: 'https://source.unsplash.com/random/2', url: 'https://en.wikipedia.org/wiki/Special:Random', presenting: false}
]

// function getStudents() {
//     // use db from index.js to query data from mongodb
//     // get urls from mongo
//
//     let data = [];
//     let cursor = db.client().collection('student')
//         .find({});
//
//     function iterateFunc(doc) {
//         console.log(JSON.stringify(doc, null, 4))
//         data.push(JSON.stringify(doc, null, 4));
//     }
//
//     function errorFunc(error) {
//         if (error){
//             console.log('error: ', error);
//         }
//     }
//     cursor.forEach(iterateFunc, errorFunc);
//
//     return data;
// }

function getStudents() {
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


