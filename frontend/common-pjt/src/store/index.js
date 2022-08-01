// 사가 관련
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { signupSagas } from './signupSagas';
import { all } from "redux-saga/effects";
import {configureStore, combineReducers} from '@reduxjs/toolkit'



import signupReducer from '../components/auth/signup/signup-slice'

const rootReducers = combineReducers({
  signup: signupReducer
})


//saga나 reducer가 여러개일때 묶어줌
function *rootSaga() {
  yield all([...signupSagas,])  
}

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = configureStore({
  reducer: rootReducers,
  middleware: middlewares,
})

sagaMiddleware.run(rootSaga)

export default store