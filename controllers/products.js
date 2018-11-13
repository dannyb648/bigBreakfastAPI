const ProductModel = require('../models/products.js')

exports.getAllProducts = async (req, res) => {
	// Get Database
	try {
		var products = await ProductModel.selectAll()
	} catch (err) {
		return res.status(500).send({'message': 'Something went wrong.'})
	}
	
	// Assign Status Code
	return res.status(200).send(products)
}

exports.getProductByID = async (req, res) => {
	if (!req.params.productID) {
		return res.status(401).send({'message': 'Please supply a productID.'})
	}

	try {
		var product = await ProductModel.selectByID(req.params.productID)
	} catch (err) {
		return res.status(500).send({'message': 'Something went wrong.'})
	}

	if (product.length > 0) {
		return res.status(200).send(product)
	} else {
		return res.status(204).send({})
	}
}

exports.searchProductByString = async (req, res) => {
	if (!req.params.string) {
		return res.status(401).send({'message': 'Please supply a product name as string in URI'})
	}

	try {
		var products = await ProductModel.matchByName(req.params.string)
	} catch (err) {
		console.error(err)
		return res.status(500).send({'message': 'Something went wrong.'})
	}

	if (products || products.length > 0) {
		return res.status(200).send(products)
	} else {
		return res.status(204).send({})
	}
}