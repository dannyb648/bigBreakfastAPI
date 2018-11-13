const pool = require('../databaseConnection.js')

// Returns all products in database
exports.selectAll = async () => {
	let queryString = 'SELECT * FROM bigbreakfast.products'

	try {
	    var result = await pool.query(queryString)
	} catch(err) {
	    throw new Error(err)
	}

	return result
}

exports.selectByID = async (productID) => {
	let queryString = 'SELECT * FROM bigbreakfast.products WHERE productID = ?'
	let values = [productID]

	try {
		var result = await pool.query(queryString, values)
	} catch (err) {
		throw new Error(err)
	}

	return result
}

exports.matchByName = async (string) => {
	let queryString = "SELECT * FROM bigbreakfast.products WHERE name LIKE CONCAT('%', ?, '%')"
	let value = [string]

	try {
		var result = await pool.query(queryString, value)
	} catch (err) {
		throw new Error(err)
	}

	return result
}