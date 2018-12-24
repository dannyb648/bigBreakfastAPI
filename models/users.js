const pool = require('../databaseConnection.js')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const moment = require('moment')

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

exports.storeRegistration = async (email, password) => {
	let queryString = 'INSERT INTO bigbreakfast.users (email, verified, passwordHash, role) \
					   VALUES (?, ?, ?, ?)'
	let values = [email, 0, 'replaceString', 'user']

	try {
		let hash = await bcrypt.hash(password, 10)
		values[2] = hash
	 	await pool.query(queryString, values)
	 	return true
	} catch (err) {
		console.log(err)
		throw new Error(err)
	}
}

exports.storeVerificationToken = async (email) => {
	let token = crypto.randomBytes(40).toString('hex')
	console.log(token)

	let queryString = 'INSERT INTO bigbreakfast.tokens (token, type, expiryTime, creationTime) \
					   VALUES (?, ?, ?, ?)'
	let values = [	token, 
					'verification', 
					moment().add(6, 'h').format('YYYY-MM-DD HH:mm:ss'), 
					moment().format('YYYY-MM-DD HH:mm:ss')]

	try {
		await pool.query(queryString, values)
		return true
	} catch (err) {
		console.log(err)
		throw new Error(err)
	}
}

