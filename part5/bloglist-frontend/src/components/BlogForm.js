import Blog from './Blog'
import React, { useRef } from 'react'
import './BlogForm.css'
import NewBlogForm from './NewBlogForm'
import Toggleable from './Toggleable'
import propTypes from 'prop-types'
import blogsService from '../services/blogsService'

const BlogForm = ({
  blogs,
  user,
  setUser,
  setBlogs,
  showMessage,
  setShowMessage
}) => {
  const successMessageStyle={
    color:'green',
    borderWidth:'0.1rem',
    borderColor:'green',
    backgroundColor: 'rgb(163, 255, 163)'
  }
  const errorMessageStyle ={
    color:'red',
    borderWidth:'0.1rem',
    borderColor:'red',
    backgroundColor: 'pink',
  }
  const toggleableRef = useRef()


  const createBlog = async (blogInfo) => {
    try {
      const newBlog = await blogsService.createBlog(blogInfo)
      toggleableRef.current.toggleVisibility()
      setBlogs([...blogs, newBlog])
      setShowMessage({
        message: `Successfully created blog for ${blogInfo.title} by ${blogInfo.author}`,
        style: successMessageStyle,
      })
    } catch (error) {
      setShowMessage({
        message: 'Missing blog info. Could not create new blog',
        style: errorMessageStyle,
      })
      console.log(error)
    }
  }

  const handleLogoutClick = () => {
    window.localStorage.removeItem('loggedUser')
    setUser()
    setShowMessage({
      message:'Successfully logged out',
      style:successMessageStyle
    })
  }

  const likeButtonClick = async (blog) => {
    const newLikes = blog.likes + 1
    const index = blogs.findIndex((x) => x.id === blog.id)
    const updatedBlogs = [...blogs]
    updatedBlogs[index].likes = newLikes
    await blogsService.updateBlog({ likes: blog.likes }, blog.id)
    updatedBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(updatedBlogs)
  }

  const handleDeleteClick = (blog) => {
    if (window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)) {
      blogsService.deleteBlog(blog.id)
      const updatedBlogs = blogs.filter((x) => {
        return x.id !== blog.id
      })
      console.log(updatedBlogs)
      setBlogs(updatedBlogs)
    }
  }

  return (
    <div>
      <div style={showMessage.style}>{showMessage.message}</div>
      <h1>Blogs</h1>
      <div>
        <span className="userStatement">
          {user.name} is currently logged in
        </span>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      <h1>Create a new blog</h1>
      <Toggleable buttonLabel="Show Blog Form" ref={toggleableRef}>
        <NewBlogForm
          createBlog={createBlog}
        />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} likeButtonClick={likeButtonClick} handleDeleteClick={handleDeleteClick}/>
      ))}
    </div>
  )
}

BlogForm.propTypes = {
  blogs:propTypes.array.isRequired,
  user:propTypes.object.isRequired,
  setUser:propTypes.func.isRequired,
  setBlogs:propTypes.func.isRequired,
  showMessage:propTypes.object.isRequired,
  setShowMessage:propTypes.func.isRequired
}

export default BlogForm
