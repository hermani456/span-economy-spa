const url = require('url')
const http = require('http')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const enviar = require('./mailer')
const getData = require('./getdata')
const template = require('./mensaje')

const port = 3000

http
	.createServer(async (req, res) => {
		const urlParse = url.parse(req.url, true)
		const { correos, asunto, contenido } = urlParse.query
		if (urlParse.pathname === '/') {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			fs.readFile('index.html', 'utf8', (err, html) => {
				if (err) res.end('archivo html no encontrado')
				else res.end(html)
			})
		}
		if (urlParse.pathname.includes('/mailing')) {
			if (correos) {
				const { dolar, euro, uf, utm } = await getData()
				const mensaje = template(dolar, euro, uf, utm)
				enviar(correos.split(','), asunto, contenido + mensaje)
					.then((data) => {
						console.log(data);
						fs.writeFile(
							`./correos/${uuidv4()}.txt`,
							`${contenido + mensaje}`,
							(err) => {
								if (err) res.end(`Error:${err}`)
								else res.end('correo enviado')
							}
						)
					}
					)
					.catch((err) => res.end('error enviando correo'))
			} else {
				res.end('no se enviaron correos')
			}
		}
	})
	.listen(port, () => {
		console.log(`servidor corriendo en: http://localhost:${port}`)
	})
