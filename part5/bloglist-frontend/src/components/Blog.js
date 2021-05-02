import React, { useState } from 'react'
import blogService from '../services/blogsService'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    border: '0.1rem solid black',
    margin: '0.5rem',
  }
  const buttonStyle = {
    marginLeft: '1rem',
  }

  const showButtonClick = () => {
    setShow(!show)
  }

  const likeButtonClick = async () => {
    const newLikes = blog.likes + 1
    const index = blogs.findIndex((x) => x.id === blog.id)
    const updatedBlogs = [...blogs]
    updatedBlogs[index].likes = newLikes
    await blogService.updateBlog({ likes: blog.likes }, blog.id)
    updatedBlogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(updatedBlogs)
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)) {
      blogService.deleteBlog(blog.id)
      const updatedBlogs = blogs.filter((x) => {
        return x.id !== blog.id
      })
      console.log(updatedBlogs)
      setBlogs(updatedBlogs)
    }
  }

  const extraInfo = (
    <div>
      <div>{blog.url}</div>
      <div>
        {blog.likes}{' '}
        <button style={buttonStyle} onClick={likeButtonClick}>
          Like
        </button>
      </div>
      <div>{blog.user.name}</div>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button style={buttonStyle} onClick={showButtonClick}>
        {show ? 'Hide' : 'Show more info'}
      </button>
      {show ? extraInfo : ''}
    </div>
  )
}

export default Blog
