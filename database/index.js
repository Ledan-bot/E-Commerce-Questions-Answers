const mongoose = require('mongoose')
const connectionString = require('../env/config.js')
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected')
})

const { Schema } = mongoose;


//QUESTIONS SCHEMA & FUNCTIONS
let questionSchema = new Schema({
  id: Number,
  product_id: Number,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number
})

let Question = mongoose.model('Question', questionSchema, 'questions')
//Queires into the questions collection go Below
let fetchQuestions = async (product_id) => {
  return Question.find({'product_id': product_id})
}

let addNewQuestion = async (question) => {
  let lastUsedid = await Question.find().sort({"id": -1}).limit(1)
  let nextId = lastUsedid[0].id + 1
  console.log(nextId)
  let newQuestion = new Question({
    id: nextId,
    product_id: question.product_id,
    body: question.body,
    date_written: new Date(),
    asker_name: question.name,
    asker_email: question.email,
    reported: false,
    helpful: 0
  })

  newQuestion.save((err, saved) => {
    if (err => {
      console.log(err)
    })
    return saved
  })
}

let markQuestionHelpful = async (question_id) => {
  let succces = await Question.updateOne({id: question_id}, { $inc: {helpful: 1}})
  return succces
}

let reportQuestion = async (question_id) => {
  let reported = await Question.updateOne({id: question_id}, {reported: true})
  return reported
}


//ANSWER SCHEMA & FUNCTIONS
let answerSchema = new Schema({
  id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number
})


let Answer = mongoose.model('Answer', answerSchema, 'answers')
//Queries into the answers collection go Below
let fetchAnswers = async (question_id, limit = 5) => {
  let answers = await Answer.find({question_id: question_id}).limit(limit)
  return answers
}

const addNewAnswer = async (answer) => {
  let lastUsedId = await Answer.find().sort({"id": -1}).limit(1)
  let nextId = lastUsedId[0].id + 1

  let newAnswer = new Answer({
    id: nextId,
    question_id: answer.question_id,
    body: answer.body,
    date_written: new Date(),
    answerer_name: answer.name,
    answerer_email: answer.email,
    reported: false,
    helpful: 0
  })

  newAnswer.save((err, saved) => {
    if (err => {
      console.log(err)
    })
    return saved
  })
}

const markAnswerHelpful = async (answer_id) => {
  let succces = await Answer.updateOne({id: answer_id}, {$inc: {helpful: 1}})
  return succces
}

const reportAnswer = async (answer_id) => {
  let reported = await Answer.updateOne({id: answer_id}, {reported: true})
  return reported
}



//PHOTO SCHEMA & FUNCTIONS
let answerPhotoSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String
})

let AnswerPhoto = mongoose.model('AnswerPhoto', answerPhotoSchema, 'answer_photos')

let fectchAnswerPhotos = async (answer_id) => {
  return AnswerPhoto.find({answer_id: answer_id})
}

module.exports = {
  fetchQuestions: fetchQuestions,
  addNewQuestion: addNewQuestion,
  markQuestionHelpful: markQuestionHelpful,
  reportQuestion: reportQuestion,
  fetchAnswers: fetchAnswers,
  addNewAnswer: addNewAnswer,
  markAnswerHelpful: markAnswerHelpful,
  reportAnswer: reportAnswer,
  fectchAnswerPhotos: fectchAnswerPhotos
}

