import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from 'redux-saga/effects'


import { signupActions } from '../components/auth/signup/signup-slice'


import { createUser } from '../api/api'

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUser, payload)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
  
}

function* onCreateUser() {
  const { createUserStart } = signupActions
  yield takeLatest(createUserStart, onCreateUserStartAsync);
}

export const signupSagas = [
  fork(onCreateUser),
]