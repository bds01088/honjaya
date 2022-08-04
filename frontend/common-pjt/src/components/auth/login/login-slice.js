import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'
import { deleteToken, saveToken } from '../../../api/JWT'

// 로그인
export const login = createAsyncThunk(
  'LOGIN',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/honjaya/users/login', userData)
      const {
        data: { accessToken },
      } = res
      saveToken(accessToken)
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
      const res = await axios.get('/honjaya/users/')
      console.log(res.data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const initialState = {
  user: {},
  loading: false,
  error: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {}
    }
  },
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.loading = false
    },
    [login.rejected]: (state) => {
      state.isAuthenticated = false
    }
  }

})


export const { resetUser } = loginSlice.actions 
export default loginSlice.reducer
