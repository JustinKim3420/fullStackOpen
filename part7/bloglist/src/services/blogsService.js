import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getConfig = ()=>{
  return {
    headers: { Authorization: `bearer ${(JSON.parse(localStorage.getItem('loggedUser'))).token}` }
  }
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const updateBlog = async (updatedBlog, id) => {
  const newUrl = baseUrl.concat(`/${id}`)
  const response = await axios.put(newUrl, updatedBlog, getConfig())
  return response.data
}

const deleteBlog = async (id) => {
  const newUrl = baseUrl.concat(`/${id}`)
  await axios.delete(newUrl, getConfig())
}

const blogService={
  getAll,
  createBlog,
  updateBlog,
  deleteBlog
}

export default blogService