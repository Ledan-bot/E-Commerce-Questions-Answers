const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/E_commerce', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('connected')
})

const { Schema } = mongoose;

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
  fetchAnswers: fetchAnswers,
  fectchAnswerPhotos: fectchAnswerPhotos
}

