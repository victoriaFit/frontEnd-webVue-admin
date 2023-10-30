import axios from 'axios'
const MY_IP = import.meta.env.VITE_MY_IP

const api = axios.create({
  // baseURL: `http://${MY_IP}:19003/api/`,
  // baseURL: 'http://191.52.55.159:19003/api/',
  baseURL: 'https://padariabackend.1.us-1.fl0.io/api/'
  // baseURL: 'http://127.0.0.1:8000/api/'
})

export default api