import axios from 'axios'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 5000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16286566003672197038081","bc":"110100"}'
  }
})

export default http
