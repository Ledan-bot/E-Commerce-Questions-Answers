const mongoose = require('mongoose');

//Initialize connection to DB

const { Schema } = mongoose;

let testProductSchema = new Schema({
  product_Id: Number,
  results: []
})


let testQuestionSchema = new Schema({
  question_id: Number,
  question_body: String,
  question_date: new Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  Answers: {}
})


let testAnswerSchema = new Schema({
  id: Number,
  question_id: Number,
  body: String,
  date: new Date,
  answerer_name: String,
  helpfulness: Number,
  photos: []
})