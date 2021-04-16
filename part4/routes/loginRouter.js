const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

loginRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const passwordIsCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(passwordIsCorrect && user)) {
    response.status(401).send("invalid username or password");
  }

  const userForToken = {
    username:user.username,
    id:user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  response.status(200).send({
    token:token,
    username:user.username,
    name:user.name
  })
});

module.exports = loginRouter