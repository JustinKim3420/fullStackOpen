const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const morgan = require('morgan')
app.use(
	morgan((tokens, req, res) => {
		morgan.token('body', (req) => {
			return JSON.stringify(req.body)
		})

		if (req.method === 'POST') {
			return [
				tokens.method(req, res),
				tokens.url(req, res),
				tokens.status(req, res),
				tokens.res(req, res, 'content-length'),
				'-',
				tokens['response-time'](req, res),
				'ms',
				tokens.body(req, res),
			].join(' ')
		}
	})
)

const mongoUrl = config.MONGODB_URI
console.log('Connecting to MongoDB...')
mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log('Successfully concted to MongoDB'))
	.catch((error) =>
		console.log('Error in connecting to MongoDB', error.message)
	)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', require('./routes/blogRouter'))


module.exports = app
