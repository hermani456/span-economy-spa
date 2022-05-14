const nodemailer = require('nodemailer')

function enviar(to, subject, html) {
	const transporter = nodemailer.createTransport({
		service: 'yahoo',
		auth: {
			user: 'palomaconbotas@yahoo.com',
			pass: 'kddpoixqhfdwfoqj',
		},
	})
	const mailOptions = {
		from: 'palomaconbotas@yahoo.com',
		to,
		subject,
		html,
	}
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) console.log(err)
		if (data) console.log(data)
	})
}

module.exports = enviar
