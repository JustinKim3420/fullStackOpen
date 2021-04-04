import axios from "axios";

// Currently only works when in the same address as backend
// proxy server won't solve this issue as json-server does not allow
// to add the api prefix
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => {
    return response.data
  });
};

const deleteName = (id) =>{
  const url=baseUrl.concat(`/${id}`)
  return axios.delete(url);
}

const update = (id, newObject) =>{
  const url=baseUrl.concat(`/${id}`)
  const request = axios.put(url, newObject)
  return request.then(response =>response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create , deleteName , update};
