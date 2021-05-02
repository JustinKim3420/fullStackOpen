import axios from 'axios'
const baseUrl = '/api/login'

const postLogin = async (data) => {
  return await axios.post(baseUrl, data)
}

const loginService={
  postLogin
}

export default loginService