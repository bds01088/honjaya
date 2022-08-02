// //사가 관련
// import { applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { signupSagas } from './signupSagas';
// import { all } from "redux-saga/effects";
// import {configureStore, combineReducers} from '@reduxjs/toolkit'
// import { createBrowserHistory } from 'history'

// import logger from 'redux-logger';
import signupReducer from '../components/auth/signup/signup-slice'
import loginReducer from '../components/auth/login/login-slice'

//떵크 관련
import { combineReducers, configureStore } from '@reduxjs/toolkit'


const rootReducers = combineReducers({
  signup: signupReducer,
  login: loginReducer
})


//saga나 reducer가 여러개일때 묶어줌
// function *rootSaga() {
//   yield all([...signupSagas,])  
// }

// const customHistory = createBrowserHistory()
// const sagaMiddleware = createSagaMiddleware(
//   {context: {
//     history: customHistory,
//   }},
// )
// const middlewares = [sagaMiddleware]

// if(process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }

//직렬화 오류 해결 https://guiyomi.tistory.com/116
const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
  // middleware: middlewares,
})

// sagaMiddleware.run(rootSaga)

export default store