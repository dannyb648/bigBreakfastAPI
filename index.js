const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 3000

app.get('/api/test', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT)

module.exports = app