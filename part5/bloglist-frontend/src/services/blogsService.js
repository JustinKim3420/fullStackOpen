import axios from 'axios'
const baseUrl = '/api/blogs'

let token;

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) =>{
  token = `bearer ${newToken}`
}

const createBlog = async (newBlog) =>{
  const config = {
    headers:{Authorization:token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog, id) =>{
  const config = {
    headers:{Authorization:token}
  }
  const newUrl = baseUrl.concat(`/${id}`)
  const response = await axios.put(newUrl, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id)=>{
  const config = {
    headers:{Authorization:token}
  }
  const newUrl = baseUrl.concat(`/${id}`)
  await axios.delete(newUrl, config)
}

const blogService={
  getAll,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog
}

export default blogService