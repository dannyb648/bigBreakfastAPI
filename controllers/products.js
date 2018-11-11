const model = require('../models/products.js')

exports.getAllProducts = async function(req, res) {
	// Validate Request

	// Get Database
	var result = await model.getAll()
	
	// Assign Status Code
	res.status(200).send(result)
}