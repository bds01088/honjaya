import baseAxios from 'axios'
import {getToken} from './JWT'
const axios = baseAxios.create({
  baseURL: 'https://i7e104.p.ssafy.io',
  // baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

//headers에 반복적으로 담아 요청 보내기 때문에 interceptors를 활용
axios.interceptors.request.use((config) => {
  config.headers['access-Token'] = `${getToken()}`
  return config
})

export default axios
