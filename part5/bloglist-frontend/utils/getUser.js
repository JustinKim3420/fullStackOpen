const jwt = require("jsonwebtoken")
const config = require('./config')

const getUser = (request, response , next)=>{
    const token = request.token;
    const decodedToken = jwt.verify(token, config.SECRET)
    request.body.userId=decodedToken.id.toString();
    next()
}

module.exports = getUser