const db = require('./index')

let scores = [
    {id: 1, presenter_id: 1, scorer_name: 'Huyen', criteria_1: 8, ciretria_2: 9},
    {id: 4, presenter_id: 1, scorer_name: 'Ngoc', criteria_1: 8, ciretria_2: 9},
    {id: 3, presenter_id: 1, scorer_name: 'Nguyen', criteria_1: 8, ciretria_2: 9},
    {id: 2, presenter_id: 3, scorer_name: 'Huyen', criteria_1: 8, ciretria_2: 9},
]

function createScore() {

}

function getScoreByPresenterID(id) {
    return scores.filter(score => score.presenter_id == id)
}

function getScoreByScorerName(name) {
    return scores.filter(score => score.scorer_name == name)
}

function getPresenterAvgScore(id) {

}

module.exports = {
    data: scores,
    getScoreByPresenterID: getScoreByPresenterID,
    getScoreByScorerName: getScoreByScorerName,
}