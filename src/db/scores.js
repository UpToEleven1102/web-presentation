const db = require('./index')

let scores = [
    {user_id: 1, presenter_id: 1, criteria_1: 8, criteria_2: 8, criteria_3: 8, criteria_4: 8, criteria_5: 8},
    {user_id: 4, presenter_id: 1, criteria_1: 7, criteria_2: 7, criteria_3: 7, criteria_4: 7, criteria_5: 7},
    {user_id: 3, presenter_id: 1, criteria_1: 1, criteria_2: 1, criteria_3: 3, criteria_4: 1, criteria_5: 1},
    {user_id: 2, presenter_id: 3, criteria_1: 8, criteria_2: 9, criteria_3: 1, criteria_4: 8, criteria_5: 9},
]

function createScore(score) {
    scores.push(score)
    console.log(scores)
}

function getScoreByPresenterID(id) {
    return scores.filter(score => score.presenter_id == id)
}

function getScoreByScorerID(id) {
    return scores.filter(score => score.user_id == id)
}

function getScores() {
    return scores
}

function getPresenterAvgScore(id) {
    const data = scores.filter(score => score.presenter_id === id)

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
    data: scores,
    getScoreByPresenterID: getScoreByPresenterID,
    getScoreByUserID: getScoreByScorerID,
    createScore: createScore,
    getScores: getScores,
    getPresenterAvgScore: getPresenterAvgScore
}