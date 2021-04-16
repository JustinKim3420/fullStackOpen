const jwt = require("jsonwebtoken")

const getUser = (request, response , next)=>{
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.body.id=decodedToken.id.toString();
    next()
}

module.exports = getUser