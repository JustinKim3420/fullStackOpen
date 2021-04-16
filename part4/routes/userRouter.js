const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
require("express-async-errors");

userRouter.get('/',async (request, response)=>{
    const users = await User.find({}).populate("blog", 'title author url');;
    response.json(users);
})

userRouter.post('/', async (request, response)=>{
    const body = request.body;
    const existingUser = await User.findOne({username:body.username})
    let errors= [];
    if(request.body.password.length<3){
        errors.push({error:"passwords should have a minimum length of 3"})
    }
    if(request.body.username.length<3){
        errors.push({error:"usernames should have a minimum length of 3"})
    }
    if(existingUser){
        errors.push({error:"username should be unique"})
    }

    if(errors.length>0){
        return response.status(400).json(errors)
    }
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        name:body.name,
        passwordHash:passwordHash,
        username:body.username
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = userRouter;