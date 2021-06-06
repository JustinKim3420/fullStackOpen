import React from 'react'
import {Link} from 'react-router-dom'

const Blog = ({ blog,likeButtonClick, handleDeleteClick }) => {

  const blogStyle = {
    border: '0.1rem solid black',
    margin: '0.5rem',
  } 

  return (
    <div className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link> 
    </div>
  )
}

export default Blog
