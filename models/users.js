const pool = require('../databaseConnection.js')

exports.checkIfEmailTaken = async (email) => {
	let queryString = 'SELECT email FROM bigbreakfast.users WHERE email = ?'
	let value = [email]

	try {
		var result = await pool.query(queryString, value)
	} catch (err) {
		throw new Error(err)
	}

	if (result.length > 0) {
		return true
	} else {
		return false
	}
}