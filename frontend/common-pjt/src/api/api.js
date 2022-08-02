// import axios from 'axios'
import axios from './http';
export const createUser = async (user) =>
  await axios.post('/honjaya/users/signup', user)

export const emailCheck = async (email) =>
await axios.get(`/honjaya/users/find/email/${email}`)


export const nicknameCheck = async (nickname) =>
await axios.get(`/honjaya/users/find/nickname/${nickname}`)


// export const emailCheck = async function getData(email) {
//   try {
//     const response = await axios.get(`/honjaya/users/find/email/${email}`)
//     console.log(response)
//   }
// }


// export const emailCheck = async (email) {
//   try {
//     const response = await axios.get(`/honjaya/users/find/email/${email}`)
//     const userId = response.data
//     console.log(response)
//   } catch(err) {
//     console.log(err);
//   }
// }