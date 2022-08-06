// //사가 관련
// import { applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { signupSagas } from './signupSagas';
// import { all } from "redux-saga/effects";
// import {configureStore, combineReducers} from '@reduxjs/toolkit'
// import { createBrowserHistory } from 'history'

//persist관련
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import logger from 'redux-logger';
import signupReducer from '../components/auth/signup/signup-slice'
import loginReducer from '../components/auth/login/login-slice'
import hashtagReducer from '../components/main/hashtag/hashtag-slice'
import rateReducer from '../components/main/hashtag/rate-slice'
//떵크 관련
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootPersistConfig = {
  key: 'root',
  storage,
};


const rootReducers = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  hashtag: hashtagReducer,
  rate: rateReducer
})


const persistedReducer = persistReducer(rootPersistConfig, rootReducers);

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
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',


})

// sagaMiddleware.run(rootSaga)

export default function configStore() {
  const persistor = persistStore(store);
  return { store, persistor };
}


// export default store;