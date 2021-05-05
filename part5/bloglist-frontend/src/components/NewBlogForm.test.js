import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'


test('calls the event handler with the correct parameters', () => {
  const sampleInput = {
    title:'test title',
    author:'test author',
    url:'test url'
  }

  const createBlog = jest.fn()
  const component = render(<NewBlogForm createBlog={createBlog}/>)
  const form = component.container.querySelector('.NewBlogForm')
  const inputArray = component.container.querySelectorAll('input')

  for (const input of inputArray){
    fireEvent.change(input,{
      target:{ value:sampleInput[input.name] }
    })
  }

  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(sampleInput.title)
  expect(createBlog.mock.calls[0][0].author).toBe(sampleInput.author)
  expect(createBlog.mock.calls[0][0].url).toBe(sampleInput.url)
})

