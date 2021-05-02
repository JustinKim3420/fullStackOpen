const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const getUser = require('../utils/getUser')

blogRouter.get("", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name");
  response.json(blogs);
});

blogRouter.post("", getUser, async (request, response) => {
  const body = request.body;
  if (!body.likes) {
    body.likes = 0;
  }
  if (!body.title && !body.url) {
    return response.status(400).json({ error: "Please provide a url or a title" });
  }
  const user = await User.findById(body.userId);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.userId,
  });

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save();
  response.status(200).json(savedBlog)
});

blogRouter.put("/:id",getUser, async (request, response)=>{
  const body = request.body
  const id= request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id,body,{new: true})

  response.json(updatedBlog)
})

blogRouter.delete("/:id",getUser, async (request, response)=>{
  const id= request.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)

  response.json({message:`${deletedBlog.title} successfully deleted`})
})

module.exports = blogRouter;
