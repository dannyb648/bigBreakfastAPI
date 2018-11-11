const pool = require('../databaseConnection.js')

// Returns all products in database
exports.getAll = async function(){
	let queryString = 'SELECT * FROM bigbreakfast.products'

	try {
	    var result = await pool.query(queryString)
	} catch(err) {
	    throw new Error(err)
	}

	return result
}