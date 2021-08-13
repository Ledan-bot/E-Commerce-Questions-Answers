const express = require('express');
const dataBase = require('../database/index.js')
let app = express()
app.use(express.json());

app.get('/', (req, res) => {
  console.log('SUP humans')
  res.send('sup Martians?')
})

app.get('/qa/questions', (req, res) => {
  let productId = req.query.product_Id
  let page = req.query.page || 1;
  let count = req.query.count || 1
  let returnedObject = {
    product_id: productId,
    results: []
  }
  //from here we need to query into the database
  dataBase.fetchQuestions(productId)
    .then(questions => {
      for (var i = 0; i < questions.length; i++) {
        let currentQuestion = questions[i]
        let toBePushed = {
          question_id: currentQuestion.id,
          question_body: currentQuestion.body,
          question_date: currentQuestion.date_written,
          asker_name: currentQuestion.asker_name,
          question_helpfulness: currentQuestion.helpful,
          reported: currentQuestion.reported,
          answers: {}
        }
        returnedObject.results.push(toBePushed)
      }
    return returnedObject
    })
    .then(async returnedObject => {
      async function innerfunction(object) {
        let j = object.results.length
        for (let i = 0; i < j; i++) {
          let awaitingAnswers = await dataBase.fetchAnswers(object.results[i].question_id)
          awaitingAnswers.forEach(answer => {
            object.results[i].answers[answer.id] = {
              id: answer.id,
              body: answer.body,
              date: answer.date_written,
              answerer_name: answer.answerer_name,
              helpfulness: answer.helpful,
              photos: []
            }
          })
        }
        return object
      }
      let returned = await innerfunction(returnedObject)
      res.send(returned)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id
  let page = req.params.page || 1
  let count = req.params.count || 5
  let response = {
    question: question_id,
    page: page,
    count: count,
    results: []
  }
  dataBase.fetchAnswers(question_id, count)
    .then(answers => {
      answers.forEach(answer => {
        let toBePushed = {
          answer_id: answer.id,
          body: answer.body,
          date: answer.date_written,
          answerer_name: answer.answerer_name,
          helpfulness: answer.helpful,
          photos: []
        }
        response.results.push(toBePushed)
      })
      res.send(response)
    })
    .catch(err => {
      console.log(err)
    })
})

let port = 3636;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})