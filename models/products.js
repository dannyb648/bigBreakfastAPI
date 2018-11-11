const pool = require('../databaseConnection.js')

// Returns all products in database
exports.selectAll = async function(){
	let queryString = 'SELECT * FROM bigbreakfast.products'

	try {
	    var result = await pool.query(queryString)
	} catch(err) {
	    throw new Error(err)
	}

	return result
}

exports.selectProductByID = async function(productID){
	let queryString = 'SELECT * FROM bigbreakfast.products WHERE productID = ?'
	let values = [productID]

	try {
		var result = await pool.query(queryString, values)
	} catch(err) {
		throw new Error(err)
	}

	return result
}