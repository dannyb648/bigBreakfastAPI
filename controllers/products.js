const model = require('../models/products.js')

exports.getAllProducts = async (req, res) => {
	// Get Database
	var products = await model.selectAll()
	
	// Assign Status Code
	res.status(200).send(products)
}

exports.getProductByID = async (req, res) => {
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

exports.searchProductByString = async (req, res) => {
	if (!req.params.string) {
		res.status(401).send({'message': 'Please supply a product name as string in URI'})
	}

	try {
		var products = await model.matchProductsByName(req.params.string)
	} catch (err) {
		console.error(err)
		res.status(500).send({'message': 'Something went wrong.'})
	}

	if (products || products.length > 0) {
		res.status(200).send(products)
	} else {
		res.status(204).send({})
	}
}