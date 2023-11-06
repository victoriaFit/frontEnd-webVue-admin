import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.182.116:19003/',
})

export default api