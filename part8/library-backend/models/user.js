const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        minLength:4,
        unique:true
    },
    name:String,
    passwordHash:{
        type:String,
        minLength:4
    },
    favoriteGenre:String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)