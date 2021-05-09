const express = require('express')
const testRouter = express.Router()

const Blog = require('../models/blog')
const User = require('../models/user')

testRouter.delete('/reset', async ( request , response ) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.send('Got a DELETE request')
})

module.exports = testRouter