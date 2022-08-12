import baseAxios from 'axios'
import {getRefreshToken, getToken, saveToken, deleteToken, deleteRefreshToken} from './JWT'
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

axios.interceptors.response.use( 
  (response) => {
    return response
  },
  async (error) => {
    const { config, response: {status} } = error
    console.log(error)
    if (config.url === '/honjaya/users/refresh') {
      return Promise.reject(error);
    }
    else if (status === 401) {
      console.log("401일때 실행됌?")
      const originalRequest = config
      let refreshToken = await getRefreshToken()
      const {data} = await axios.get(
        '/honjaya/users/refresh',
        { headers: {'refresh-token' : `${refreshToken}`}}
      ).catch((err) => {
        console.log("???",err)
        if (err.response.status === 401){
          deleteToken()
          deleteRefreshToken()
          console.log('토큰삭제완료')
          window.location.reload()
          // alert('재로그인 하세요')
        }
      })
      
      console.log('리프레시토큰으로 새로 받아옴', data)
      await saveToken(data.accessToken)
      console.log('새 토큰 저장됌')
      window.location.reload()
      originalRequest.headers['access-Token'] = `${getToken()}`
      return axios(originalRequest)
    }
    return Promise.reject(error);
  });

export default axios
