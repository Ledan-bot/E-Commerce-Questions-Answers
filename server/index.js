const express = require('express');
const dataBase = require('../database/index.js')
let app = express()
app.use(express.json());

app.get('/', (req, res) => {
  //test
})

app.get('/qa/questions', (req, res) => {
  let productId = req.query.product_Id
  let page = req.query.page || 1;
  let count = req.query.count || 5
  let returnedObject = {
    product_id: productId,
    results: []
  }
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
  console.log(req.params)
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

app.post('/qa/questions', (req, res) => {
  let question = {
    product_id: req.body.product_id,
    body: req.body.body,
    name: req.body.name,
    email: req.body.email
  }
  dataBase.addNewQuestion(question)
  res.status(201).send('Created')
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let question_id = req.params.question_id
  dataBase.markQuestionHelpful(question_id)
    .then((succces) => {
      res.status(204).send('No Content')
    })
    .catch(err => {
      res.status(406).send("Incorrect Information")
    })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  let question_id = req.params.question_id
  dataBase.reportQuestion(question_id)
    .then((reported) => {
      res.status(204).send('No Content')
    })
    .catch(err => {
      res.status(406).send('Incorrect Information')
    })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id
  let answer = {
    question_id: question_id,
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos || []
  }
  dataBase.addNewAnswer(answer)
  res.status(201).send('Created')
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let answer_id = req.params.answer_id
  dataBase.markAnswerHelpful(answer_id)
    .then(succces => {
      res.status(204).send('No Content')
    })
    .catch(err => {
      res.status(406).send('Incorrect Information')
    })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let answer_id = req.params.answer_id
  dataBase.reportAnswer(answer_id)
    .then((reported) => {
      res.status(204).send('No Content')
    })
    .catch(err => {
      res.status(406).send('Incorrect Information')
    })
})

app.get('/qa/questions/test', (req, res) => {
  let randomProduct = Math.floor(Math.random()*1000011)
  let returnedObject = {
    product_id: randomProduct,
    results: []
  }
  dataBase.fetchQuestions(randomProduct)
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

app.get('/qa/questions/testanswers', (req, res) => {
  let randomQues = Math.floor(Math.random()*3518963)
  let page = req.params.page || 1
  let count = req.params.count || 5
  let response = {
    question: randomQues,
    page: page,
    count: count,
    results: []
  }
  dataBase.fetchAnswers(randomQues, count)
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