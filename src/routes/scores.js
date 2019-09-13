const router = require('express').Router()
const db = require('../db/scores')

router.get('/:id', (req, res) => {
    const scores = db.getScoreByPresenterID(req.params.id)
    res.status(200).send(scores)
})

module.exports = router