const dataBase = require('./index.js')
const mongoose = require('mongoose')


describe('Fetching Questions from the Database', () => {
  afterAll( async () => {
    await mongoose.disconnect()
  })

  test('should return an object when querying into the db', async () => {
    let randomNum = Math.floor(Math.random()* 1000000)
    return dataBase.fetchQuestions(randomNum)
      .then(questions => {
        expect(questions instanceof Array).toEqual(true)
      })
  })

  test('should return the proper asker name', async () => {
    let product_Id = 2;
    return dataBase.fetchQuestions(product_Id)
      then(questions => {
        expect(questions[0].asker_name).toBe('iluvcatz')
      })
  })

  test('should return the proper question body', async () => {
    let product_Id = 2;
    return dataBase.fetchQuestions(product_Id)
      then(questions => {
        expect(questions[0].body).toBe('Where is this product made?')
      })
  })

  test('should return an answer property', async () => {
    let product_Id = 2;
    return dataBase.fetchQuestions(product_Id)
      then(questions => {
        expect(questions[0].answers).toBeTruthy()
      })
  })

})


describe('Fetching Answers from the database', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/E_commerce')
  })
  afterAll( async () => {
    await mongoose.disconnect()
  })


})