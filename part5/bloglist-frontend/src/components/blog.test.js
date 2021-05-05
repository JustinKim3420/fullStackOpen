import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog>', () => {
  test('Always renders the blog\'s title and author', () => {
    const sampleBlog = {
      title: 'blog title test',
      author: 'blog author test',
      url: 'blog url test',
      likes: 3120,
      user: {
        name: 'user name test',
      },
    }

    const component = render(<Blog blog={sampleBlog} />)
    const extraInfo = component.container.querySelector('.extraInfo')
    expect(component.container).toHaveTextContent(
      `${sampleBlog.title} ${sampleBlog.author}`
    )
    expect(extraInfo).toHaveStyle('display: none')
  })

  test('Renders extra info when button is clicked', () => {
    const sampleBlog = {
      title: 'blog title test',
      author: 'blog author test',
      url: 'blog url test',
      likes: 3120,
      user: {
        name: 'user name test',
      },
    }

    const component = render(<Blog blog={sampleBlog} />)
    const extraInfo = component.container.querySelector('.extraInfo')
    const button = component.container.querySelector('.showButton')

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      `${sampleBlog.title} ${sampleBlog.author}`
    )
    expect(extraInfo).toHaveStyle('display:block')
  })
  test('The like button calls the click handler correctly',async () => {
    const sampleBlog = {
      title: 'blog title test',
      author: 'blog author test',
      url: 'blog url test',
      likes: 3120,
      user: {
        name: 'user name test',
      },
    }

    const likeMockFunction = jest.fn()

    const component = render(<Blog blog={sampleBlog} likeButtonClick={likeMockFunction}/>)
    const showButton = component.container.querySelector('.showButton')
    fireEvent.click(showButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockFunction.mock.calls.length).toBe(2)
  })
})

