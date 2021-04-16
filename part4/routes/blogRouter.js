const blogRouter = require("express").Router();
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog");
const User = require('../models/user')
const getUser = require('../utils/getUser')
require("express-async-errors");

blogRouter.get("", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", 'username name');
  response.json(blogs);
});

blogRouter.post("", getUser, async (request, response) => {
  const body = request.body
  if (!body.likes) {
    body.likes = 0;
  }
  if (!body.title && !body.url) {
    return response.status(400).send("Please provide a URL or title");
  }
  
  const user = await User.findById(body.id)
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
    user:body.id
  });
  const savedBlog = await blog.save();
  user.blog = user.blog.concat(savedBlog._id)
  await user.save();
  response.status(200).json(savedBlog);
});

blogRouter.delete("/:id",getUser, async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id);
  if(blog.user.toString()!==body.id){
    return response.status(400).json({error:"Current user cannot modify this blog"})
  }
  // await Blog.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

blogRouter.put("/:id", async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });
  response.json(blog);
});

module.exports = blogRouter;
