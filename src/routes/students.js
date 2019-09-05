// routes for students

const router = require('express').Router()
const studentDB = require('../db/students')

router.post('/students', function(req, res) {
    // students submit info
    // save to mongo
    studentDB.postStudent(req.body)
    res.send({}, 201)
});

router.get('/students', function (req, res) {
    res.send(studentDB.getStudents())
});

router.put('/students/:id', function(req, res) {
    result = studentDB.putStudent(parseInt(req.params.id), req.body)
    res.send(result)
})

module.exports = router;