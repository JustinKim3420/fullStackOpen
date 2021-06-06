import axios from 'axios'
const baseUrl = '/api/users'

const getConfig = ()=>{
  return {
    headers: { Authorization: `bearer ${(JSON.parse(localStorage.getItem('loggedUser'))).token}` }
  }
}

export const getUsers = async ()=>{
    const users = await axios.get(baseUrl)
    return users.data
}

export const getSingleUser = async (id)=>{
  const user = await axios.get(baseUrl.concat(`/${id}`))
  return user.data
}

export const updateUser = async(updatedUser, id)=>{
      const newUrl = baseUrl.concat(`/${id}`)
      const response = await axios.put(newUrl, updatedUser, getConfig())
      return response.data
}

const usersService = {
    getUsers,
    updateUser
}

export default usersService