import React, { useState } from 'react'

const Blog = ({ blog,likeButtonClick, handleDeleteClick }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    border: '0.1rem solid black',
    margin: '0.5rem',
  }

  const showElement = show? {}:{ display:'none' }

  const buttonStyle = {
    marginLeft: '1rem',
  }

  const showButtonClick = () => {
    setShow(!show)
  }

  const extraInfo = (
    <>
      <div>{blog.url}</div>
      <div id="likes">
        {blog.likes}{' '}
        <button className="likeButton"style={buttonStyle} onClick={async () => await likeButtonClick(blog)}>
          Likes
        </button>
      </div>
      <div>{blog.user.name}</div>
      <button onClick={async () => await handleDeleteClick(blog)}>Delete</button>
    </>
  )

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='showButton' style={buttonStyle} onClick={showButtonClick}>
        {show ? 'Hide' : 'Show more info'}
      </button>
      <div className='extraInfo' style={showElement}>
        {extraInfo}
      </div>
    </div>
  )
}

export default Blog
