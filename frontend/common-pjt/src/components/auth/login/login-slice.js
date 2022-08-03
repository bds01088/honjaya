import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'
import { deleteToken, saveToken } from '../../../api/JWT'

// 로그인
export const login = createAsyncThunk(
  'LOGIN',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/honjaya/users/login', userData)
      console.log(res)
      // saveToken(token)
      } catch (err) {
        return rejectWithValue(err.res)
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
