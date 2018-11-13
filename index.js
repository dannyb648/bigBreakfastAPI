const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.SERVER_PORT

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// Placeholder until I put in a better logger like winston
app.use(function (req, res, next) {
  console.log(req.method, 'Request:', req.originalUrl)
  next()
})

// Import Controllers
const products = require('./controllers/products.js')
const users = require('./controllers/users.js')


// Routes
app.get('/api/products', products.getAllProducts)
app.get('/api/products/productID/:productID', products.getProductByID)
app.get('/api/products/name/:string', products.searchProductByString)

app.post('/api/users', users.register)


// Run app
app.listen(PORT)
console.log('Big Breakfast Application running on Port ' + PORT)
module.exports = app