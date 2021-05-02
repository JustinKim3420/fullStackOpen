/* eslint-disable no-undef */
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordIsCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!passwordIsCorrect) {
    return response.status(401).json({ error: 'Incorrect password or username' })
  }

  const userForToken = {
    username:body.username,
    id:user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)
  response.status(200).json({
    token:token,
    username:user.username,
    name:user.name
  })
})

module.exports = loginRouter
