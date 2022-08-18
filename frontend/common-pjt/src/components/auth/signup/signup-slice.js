import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'

// 회원가입
export const signup = createAsyncThunk(
  'SIGNUP',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/honjaya/users/signup', userData)
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

// 닉네임 중복 검사
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (userNickname, { rejectWithValue }) => {
    try {
      const nickname = userNickname
      const res = await axios.get(`/honjaya/users/find/nickname/${nickname}`)
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

// 이메일 중복 검사
export const checkEmail = createAsyncThunk(
  'CHECK_EMAIL',
  async (userEmail, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/honjaya/users/find/email/${userEmail}`)
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

//회원정보 수정
export const modifyUserInfo = createAsyncThunk(
  'MODIFY_USERINFO',
  async (newUserInfo, { rejectWithValue }) => {
    try {
      const res = await axios.put('/honjaya/users', newUserInfo)
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

const initialState = {
  isLoading: false,
}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true
    },
    [signup.fulfilled]: (state) => {
      state.isLoading = false
    },
    [signup.rejected]: (state) => {
      state.isLoading = false
    },
    [checkNickname.fulfilled]: (state) => {
      state.isNicknameChecked = true
    },
    [checkNickname.rejected]: (state) => {
      state.isNicknameChecked = false
    },
  },
})

export default signupSlice.reducer
