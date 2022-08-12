import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from '../../../api/http'
import { deleteToken, saveToken, getToken, saveRefreshToken } from '../../../api/JWT'

// 로그인
export const login = createAsyncThunk(
  'LOGIN',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/honjaya/users/login', userData)
      const {
        data: { accessToken, refreshToken },
      } = res
      saveToken(accessToken)
      saveRefreshToken(refreshToken)
      return res
      // saveToken(token)
      } catch (err) {
        return rejectWithValue(err.response) //err안에 response로 담겨있음
      }
    }
)

// 유저정보가져오기
export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async (arg, {rejectWithValue}) => {
    try {
      const res = await axios.get('/honjaya/users/',
      )
      return res.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

// 로그아웃
export const logout = createAsyncThunk(
  'LOGOUT',
  async (arg, {rejectWithValue}) => {
    try {
      const res = await axios.put('/honjaya/users/logout')
      deleteToken()
      console.log("로그아웃완료")
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const initialState = {
  user: {},
  loading: false,
  error: null,
  
  updateUserPoint: 0
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {}
    },
    savePoint: (state ) => {
    
      state.updateUserPoint = state.user.userPoint
      //data unwrap 하고 싶을때 current 리덕스 툴킷에서 가져다 써야함
      // console.log(current(state))
      //왜 어쩔땐 action.payload가 담기고 어쩔댄 안담기지..?

    }

  },
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.loading = false
    },
    [login.rejected]: (state) => {
      state.isAuthenticated = false
    },
    [loadUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  }

})





export const { resetUser,savePoint } = loginSlice.actions 
export default loginSlice.reducer
