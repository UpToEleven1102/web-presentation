const router = require('express').Router()
const db = require('../db/scores')

router.post('', (req, res) => {
    console.log('creating score', req.body)
    db.createScore(req.body)
    res.status(200).send({})
})

router.get('', (req, res) => {
    res.status(200).send(db.getScores())
})

router.get('/:id', async (req, res) => {
    const avg = await db.getPresenterAvgScore(parseInt(req.params.id))
    res.status(200).send(avg)
})

module.exports = router