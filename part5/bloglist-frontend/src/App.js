import React, { useState, useEffect } from 'react'
import blogsService from './services/blogsService'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [showMessage, setShowMessage] = useState({
    message:'',
    style:{}
  })

  useEffect(() => {
    async function fetchData() {
      const receivedBlogs = await blogsService.getAll({})
      receivedBlogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs(receivedBlogs)
    }
    fetchData()
  },[])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogsService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage({
        message:'',
        style:{ display:'none' }
      })
    }, 3000)
    return(() => {clearTimeout(timer)})
  },[showMessage])

  return (
    <div>
      {user && (
        <>
          <BlogForm
            blogs={blogs}
            user={user}
            setUser={setUser}
            setBlogs={setBlogs}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
          />
        </>
      )}
      {!user && (
        <>
          <LoginForm
            setUser={setUser}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
          />
        </>
      )}
    </div>
  )
}

export default App
