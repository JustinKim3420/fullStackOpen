/* eslint-disable no-undef */
const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('',async(request,response) => {
  const users = await User.find({}).populate('blogs', 'title author')
  response.json(users)
})

userRouter.post('', async (request, response) => {
  const body = request.body

  if(body.password.length<3){
    response.status(400).json({ error:'Password should have greater than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    name:body.name,
    passwordHash: passwordHash,
    username:body.username
  })

  const savedUser = await newUser.save()
  response.json(savedUser)
})

module.exports= userRouter