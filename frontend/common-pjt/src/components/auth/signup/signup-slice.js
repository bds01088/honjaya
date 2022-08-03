import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'


export const signup = createAsyncThunk(
  'SIGNUP',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/honjaya/users/signup', userData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

// 닉네임 중복 검사
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (userNickname, { rejectWithValue }) => {
    try {
      
      const nickname = userNickname
      const res = await axios.get(`/honjaya/users/find/nickname/${nickname}`)
      console.log("중복검사하기")
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const initialState = {
  isNicknameChecked: false,
  isLoading: false,
};

//닉네임검사를폴스로바꿔주자 라는 리듀서는 isNicknameChecked를 false로 바꾼다
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setNicknameCheckedFalse: (state) => {
      state.isNicknameChecked = false;
    },

  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [signup.rejected]: (state) => {
      state.isLoading = false;
    },
    [checkNickname.fulfilled]: (state) => {
      state.isNicknameChecked = true;
    },
    [checkNickname.rejected]: (state) => {
      state.isNicknameChecked = false;
    },
  },
});


export const {setNicknameCheckedFalse} = signupSlice.actions

export default signupSlice.reducer
