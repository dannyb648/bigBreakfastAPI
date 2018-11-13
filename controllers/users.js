const UserModel = require('../models/users.js')

exports.register = async (req, res) => {
	if (!req.body.email ||
		!req.body.password) {
		return res.status(401).send({'message': 'Please provide a email and password in the request body.'})
	} 

	let splitEmail = req.body.email.split("@")

	if (splitEmail.length != 2) {
		return res.status(401).send({'message': 'Please provide a valid email address.'})
	}

	// Depends on if we can store company emails... 
	if (process.env.DOMAIN && splitEmail[1] != process.env.DOMAIN) {
		return res.status(401).send({'message': 'Please provide a valid email on the company domain.'})
	}

	if (!UserModel.checkIfEmailTaken(req.body.email)) {
		return res.status(409).send({'message': 'That email has already been taken'})
	}
	


	//PLACEHOLDER
	res.status(200).send('OK')

	//hash password

	//insert value
}