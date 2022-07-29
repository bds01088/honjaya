import baseAxios from 'axios'
import {getToken} from './JWT'
const axios = baseAxios.create({
  baseURL: '', //url 배포 후에 'https://i7e104.p.ssafy.io' 로 변경
  headers: {
    'Content-Type': 'application/json'
  },
})

// headers에 반복적으로 담아 요청 보내기 때문에 interceptors를 활용
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})

export default axios