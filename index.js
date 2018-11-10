const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const users = require('./domains/users.js')

app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 3000

app.get('/api/test', users.test)

app.listen(PORT)

module.exports = app