// routes for students

const router = require('express').Router()
const studentDB = require('../db/students')

let presenting_student = null

router.post('/students', function(req, res) {
    // students submit info
    // save to mongo
    console.log('posting student', req.body)
    studentDB.postStudent(req.body)
    res.send({}, 201)
});

router.get('/students', function (req, res) {
    res.status(200).send(studentDB.getStudents())
});

router.put('/students/:id', function(req, res) {
    result = studentDB.putStudent(parseInt(req.params.id), req.body);
    res.status(200).send(result)
});

router.get('/students/presenting', function(req, res) {
    res.status(200).send(presenting_student)
})

router.post('/students/presenting', function(req, res) {
    console.log('posting presenting student', req.body)
    presenting_student = req.body.id ? req.body : null
    res.status(200).send({})
});

module.exports = router;
