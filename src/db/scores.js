const DB = require('./index')
const dbName = require('./index').dbName

async function createScore(scores) {
    try {
        const client = DB.client()
        await client.connect();

        const db = client.db(dbName);
        const r = await db.collection('score').insertMany(scores)
        await client.close()
        return r.insertedIds
    } catch (e) {
        console.log(e)
    }
}

function getScoreByPresenterID(id) {
    return id
    // return scores.filter(score => score.presenter_id == id)
}

function getScoreByScorerID(id) {
    return id
    // return scores.filter(score => score.user_id == id)
}

async function getScores(filter = {}) {
    const client = DB.client()
    await client.connect();

    const db = client.db(dbName);
    const r = await db.collection('score').find(filter).toArray()
    await client.close()
    return r
}

function getPresenterAvgScore(id) {
    // const data = scores.filter(score => score.presenter_id === id)
    const data = []
    let avg = data.length > 0 ? {}: null
    let keys = data.length > 0 ? Object.keys(data[0]).filter(key => key.indexOf('criteria_') === 0) : []
    for (let key of keys) {
        avg.presenter_id = data[0].presenter_id
        avg[key] = 0
    }
    console.log('avg ', avg)
    data.forEach(e => {
        for (let key of keys) {
            avg[key] += e[key]
        }
    })

    if (avg) {
        for (let key of keys) {
            avg[key] = parseFloat((avg[key]/(data.length)).toFixed(2))
        }
        delete avg.scorer_name
        delete avg.user_id
    }

    return avg
}

module.exports = {
    getScoreByPresenterID: getScoreByPresenterID,
    getScoreByUserID: getScoreByScorerID,
    createScore: createScore,
    getScores: getScores,
    getPresenterAvgScore: getPresenterAvgScore
}