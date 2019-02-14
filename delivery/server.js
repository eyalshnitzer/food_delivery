const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const url = 'mongodb://eyalshn:tzunga2007@ds163044.mlab.com:63044/food_delivery'
const MongoClient = require('mongodb').MongoClient
/* const ObjectID = require('../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/mongodb')
  .ObjectID */
const dbName = 'food_delivery'
const client = new MongoClient(url)
let db
const app = express()
let signUpCollection

// Body Parser middleware
app.use(bodyParser.json())

client.connect(function (err) {
  if (!err) {
    console.log('Connected successfully to server')
    db = client.db(dbName)
    signUpCollection = db.collection('users')
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server connected on port ${port}`))

app.post('/sign_up', (req, res) => {
  signUpCollection
    .find({ email: { $eq: req.body.email } })
    .toArray((err, result) => {
      if (result.length === 0) {
        signUpCollection.insert(
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            credit_card_number: req.body.credit_card_number,
            month: req.body.month,
            year: req.body.year,
            cvv: req.body.cvv,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            orders: []
          },
          function (err, response) {
            if (!err) console.log('User Signed In')
          }
        )
      } else console.log('there is allready a user with this email')

      res.json(result)
    })
})

app.get(`/sign_in`, (req, res) => {
  signUpCollection
    .find({
      $and: [
        { email: { $eq: req.query.email } },
        { password: { $eq: req.query.password } }
      ]
    })
    .toArray((err, answer) => {
      res.json(answer)
    })
})

app.post('/customer_order', (req, res) => {
  const currentDate = req.body.ordersDetails[0].currentDate
  req.body.ordersDetails.forEach(element => {
    signUpCollection.update(
      { email: req.body.email },
      { $push: { orders: element } }
    )
  })
  signUpCollection.find({ email: req.body.email }).toArray((err, answer) => {
    res.json(answer)
  })
})

app.get('/get_orders_history', (req, res) => {
  signUpCollection
    .find({ email: req.query.email }, { last_name: 1 })
    .toArray((err, answer) => {
      res.json(answer)
    })
})
