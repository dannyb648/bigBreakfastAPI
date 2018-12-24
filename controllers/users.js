const UserModel = require('../models/users.js')
const Email = require('./email.js')

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

	if (await UserModel.checkIfEmailTaken(req.body.email)) {
		return res.status(409).send({'message': 'That email has already been taken'})
	}
	
	try {
		await UserModel.storeRegistration(req.body.email, req.body.password)
	} catch (err) {
		return res.status(500).send({'message': 'Something went wrong'})
	}

	try {
		UserModel.storeVerificationToken(req.body.email)
	} catch (err) {
		return res.status(500).send({'message': 'Something went wrong'})
	}

	// try {
	//	
	//} catch (err) {

	//}


	res.status(200).send({'status':'Success'})
}



// exports.login = async (req, res) => {
// 	if (!req.body.email ||
// 		!req.body.password) {
// 		return res.status(401).send({'message': 'Please provide a email and password in the request body.'})
// 	} 


// }