const model = require('../models/products.js')

exports.getAllProducts = async function(req, res) {
	// Get Database
	var products = await model.selectAll()
	
	// Assign Status Code
	res.status(200).send(products)
}

exports.getProductByID = async function(req, res) {
	if (!req.params.productID) {
		res.status(401).send({'message': 'Please supply a productID.'})
	}

	try {
		var product = await model.selectProductByID(req.params.productID)
	} catch (err) {
		res.status(500).send({'message': 'Something went wrong.'})
	}

	if (product.length > 0) {
		res.status(200).send(product)
	} else {
		res.status(204).send({})
	}
}