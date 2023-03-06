import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://pu.vk.com',
})

instance.interceptors.request.use((request: any) => {
  request.headers = {
    ...request.headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'multipart/form-data',
  }
  return request
})

export default instance
