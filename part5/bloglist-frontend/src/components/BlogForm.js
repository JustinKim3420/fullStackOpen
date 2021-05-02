import Blog from './Blog'
import React, { useState , useRef } from 'react'
import './BlogForm.css'
import NewBlogForm from './NewBlogForm'
import Toggleable from './Toggleable'
import propTypes from 'prop-types'

const BlogForm = ({
  blogs,
  user,
  setUser,
  setBlogs,
  showMessage,
  setShowMessage
}) => {
  const [blogInfo, setBlogInfo] = useState({
    title: '',
    author: '',
    url: '',
  })
  const successMessageStyle={
    color:'green',
    borderWidth:'0.1rem',
    borderColor:'green',
    backgroundColor: 'rgb(163, 255, 163)'
  }
  const toggleableRef = useRef()

  const handleLogoutClick = () => {
    window.localStorage.removeItem('loggedUser')
    setUser()
    setShowMessage({
      message:'Successfully logged out',
      style:successMessageStyle
    })
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
          setBlogs={setBlogs}
          blogs={blogs}
          blogInfo={blogInfo}
          setBlogInfo={setBlogInfo}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          toggleVisibility = {() => toggleableRef.current.toggleVisibility()}
        />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
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
