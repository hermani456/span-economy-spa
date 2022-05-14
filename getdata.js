const axios = require('axios')

const url = 'https://mindicador.cl/api'

const getData = async () => {
	console.log('obteniendo datos')
	const { data } = await axios.get(url)
	const dolar = data.dolar.valor
	const euro = data.euro.valor
	const uf = data.uf.valor
	const utm = data.utm.valor
	return { dolar, euro, uf, utm }
}

module.exports = getData
