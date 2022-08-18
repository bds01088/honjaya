import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'

// 별점 데이터 가져오기
export const getRate = createAsyncThunk(
  'GET_RATE',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get('/honjaya/rates/average')
      return res
    } catch (err) {
      return rejectWithValue(err.response) // err안에 response로 담겨있음
    }
  },
)

//상대 평균 평가 점수 가져오기
export const getOtherRate = createAsyncThunk(
  'GET_OTHER_RATE',
  async (userNo, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/honjaya/rates/average/${userNo}`)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

//내가 해당 특정 유저를 평가했는지 내역 조회
export const getRateRecord = createAsyncThunk(
  'GET_RATE_LIST',
  async (userNo, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/honjaya/rates/${userNo}`)
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

//평가 수정하기
export const putRate = createAsyncThunk(
  'PUT_RATE',
  async (rateData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`honjaya/rates/${rateData.rateNo}`, {
        rateScore: rateData.rateScore,
      })
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

//평가하기 보내기
export const setRate = createAsyncThunk(
  'SET_RATE',
  async (rateData, { rejectWithValue }) => {
    try {
      await axios.post('/honjaya/rates/', rateData)
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

const initialState = {
  rateInfo: {},
}

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    resetRateInfo: (state) => {
      state.rateInfo = {}
    },
  },
  extraReducers: {
    [getRate.fulfilled]: (state, action) => {
      state.rateInfo = action.payload.data
    },
  },
})

export const { resetRateInfo } = rateSlice.actions

export default rateSlice.reducer
