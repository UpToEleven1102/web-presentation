// routes for students

const router = require('express').Router()
const studentDB = require('../db/students')

router.post('/students', function(req, res) {
    // students submit info
    // save to mongo
    res.send('Not implemented')
});

router.get('/students', function (req, res) {
    res.send(studentDB.getStudents())
});

module.exports = router;