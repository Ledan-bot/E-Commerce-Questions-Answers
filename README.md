
# Question & Answer RESTful API

This application is the RESTful API for the Questions & Answers service of an company's E-Commerce retail application.
## Authors

- [@Nicholas Ledan](https://github.com/Ledan-bot)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`mongodb://localhost:27017/E_commerce`




## Installation

After cloning Repo down onto local machine, check to make sure ALL Environment Variables are placed inside a newly created "config.js" file
Then we must set up our working environment by first running:

```bash
  npm install
```
After running the above command, we must set up our devopment environment by starting our server & connecting to our database:

```bash
  npm run start
````

Now after executing these commmands, we should be able to either test with Postman or connect a Front-End SPA that can interact with the routes.
## Acknowledgements

 - [Express](https://expressjs.com)
 - [NodeJS](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
 - [MongoDB](https://mongodb.com)
 - [Mongoose](https://mongoosejs.com)
## Feedback

If you have any feedback, please reach out at Nickledan5@gmail.com


## API Reference

#### Get all question pertaining to a Product

```http
  GET qa/questions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product_Id` | `string` | Product Id|

#### Get all questions pertaining to a specfic question

```http
  GET /qa/questions/:question_id/answers
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `question_id` | `string` | ID number pertaining to each question |

#### Post a new question about a Product

```http
  POST /qa/questions
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product_Id` | `string` | ID number pertaining to each product |
| `body` | `string` | Question body |
| `name` | `string` | Asker's name |
| `email` | `string` | Asker's email |

#### Mark a question helpful

```http
  PUT /qa/questions/:question_id/helpful
```

| Params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `question_id` | `string` | ID number pertaining to each question |

#### Report a question

```http
  PUT /qa/questions/:question_id/report
```

| Params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `question_id` | `string` | ID number pertaining to each question |

#### Post an answer for a Question

```http
  POST /qa/questions/:question_id/answers
```
| Params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `question_id` | `string` | ID number pertaining to each question |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body` | `string` | Answer body |
| `name` | `string` | Answer's name |
| `email` | `string` | Answer's email |
| `photos` | `string` | Photo Url |


#### Mark a Answer helpful

```http
  PUT /qa/answers/:answer_id/helpful
```

| Params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `answer_id` | `string` | ID number pertaining to each answer |

#### Report a answer

```http
  PUT /qa/answers/:answer_id/report
```

| Params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `answer_id` | `string` | ID number pertaining to each answer |