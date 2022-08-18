// persist관련
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// slice 불러오기
import signupReducer from '../components/auth/signup/signup-slice'
import loginReducer from '../components/auth/login/login-slice'
import hashtagReducer from '../components/main/hashtag/hashtag-slice'
import rateReducer from '../components/main/hashtag/rate-slice'
import modeReducer from '../components/mode/mode-slice'
import voteReducer from '../components/meeting/vote-slice'
import chatReducer from '../components/main/chat/chat-slice'
import profileReducer from '../components/main/profile/profile-slice'

// thunk 관련
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootPersistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  hashtag: hashtagReducer,
  rate: rateReducer,
  mode: modeReducer,
  vote: voteReducer,
  chat: chatReducer,
  profile: profileReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducers)

// 직렬화 오류 해결 https://guiyomi.tistory.com/116
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export default function configStore() {
  const persistor = persistStore(store)
  return { store, persistor }
}
