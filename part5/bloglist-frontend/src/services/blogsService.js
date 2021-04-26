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

const blogService={
  getAll,
  setToken,
  createBlog
}

export default blogService