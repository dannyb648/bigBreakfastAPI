const util = require('util')
const mysql = require('mysql')

const pool = mysql.createPool({
	connectionLimit	: 10,
	host     		: process.env.RDS_HOSTNAME,
	user     		: process.env.RDS_USERNAME,
	password 		: process.env.RDS_PASSWORD,
	port     		: process.env.RDS_PORT
})

pool.getConnection((err, connection) => {
	if (err) {
		throw new Error(err)
	}

	if (connection) {
		connection.release()
	}

	return
})

pool.query = util.promisify(pool.query)

module.exports = pool
