import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
  getContext,
} from 'redux-saga/effects'



import { signupActions } from '../components/auth/signup/signup-slice'
import { createUser, emailCheck, nicknameCheck } from '../api/api'




function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUser, payload)
    // console.log(response)
    
  } catch (error) {
    // console.log(error)
  }
  
}

function* onCreateUser() {
  const { createUserStart } = signupActions
  yield takeLatest(createUserStart, onCreateUserStartAsync);
}


function* onCheckEmailStartAsync({ payload }) {
  const { changeCheckEmailField } = signupActions
  const history = yield getContext("history")
  // console.log("온체크이메일페이로드", payload)
  try {
    const response = yield call(emailCheck, payload)
    console.log(response)
    const isDuplicatedEmail = response.data.trueOrFalse
    yield put(changeCheckEmailField(isDuplicatedEmail)) //put은 dispatch와 유사
    console.log(response.data.trueOrFalse)
    if (response.data.trueOrFalse) {
      alert('아이디가 중복됨')
    }
    else {
      alert('아이디가 사용가능함')
    }
  } catch(error) {
    if (error.status === 500) {
      history.push('/error') //error 페이지로 라우팅
    }
  }
}

function* onCheckEmail() {
  const { checkEmailStart } = signupActions
  yield takeLatest(checkEmailStart, onCheckEmailStartAsync)
}


function* onCheckNicknameStartAsync({ payload }) {
  const { changeCheckNicknameField } = signupActions
  console.log("온체크닉네임페이로드", payload)
  try {
    const response = yield call(nicknameCheck, payload)
    console.log(response)
    const isDuplicatedNickname = response.data.trueOrFalse
    yield put(changeCheckNicknameField(isDuplicatedNickname)) //put은 dispatch와 유사
    console.log(response.data.trueOrFalse)
    if (response.data.trueOrFalse) {
      alert('닉네임이 중복됨')
    }
    else {
      alert('닉네임이 사용가능함')
    }
  } catch(error) {
    console.log(error)
  }
}

function* onCheckNickname() {
  const { checkNicknameStart } = signupActions
  yield takeLatest(checkNicknameStart, onCheckNicknameStartAsync)
}


export const signupSagas = [
  fork(onCreateUser),
  fork(onCheckEmail),
  fork(onCheckNickname),
]