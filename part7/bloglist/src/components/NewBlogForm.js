import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const NewBlogForm = ({
  createNewBlog
}) => {

  const [blogInfo, setBlogInfo] = useState({
    title: '',
    author: '',
    url: '',
  })

  const changeHandler = (event) => {
    const value = event.target.value
    setBlogInfo({
      ...blogInfo,
      [event.target.name]: value,
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog(blogInfo)
    setBlogInfo({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <Form className='NewBlogForm' onSubmit={addBlog}>
      <Form.Group>
      <Form.Label htmlFor="titleInput">title</Form.Label>
        <Form.Control
          id="titleInput"
          name="title"
          value={blogInfo.title}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group>
      <Form.Label htmlFor="authorInput">author:</Form.Label>
        <Form.Control
          id="authorInput"
          name="author"
          value={blogInfo.author}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="url">url:</Form.Label>
        <Form.Control
          id="urlInput"
          name="url"
          value={blogInfo.url}
          onChange={changeHandler}
        />
      </Form.Group>
      <Button type="submit">Create blog</Button>
    </Form>
  )
}

export default NewBlogForm
