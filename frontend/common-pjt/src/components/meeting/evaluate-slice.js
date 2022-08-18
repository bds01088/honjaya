import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/http'

//포인트 감소
export const usePoint = createAsyncThunk(
  'USE_POINT',
  async (pointData, { rejectWithValue }) => {
    try {
      const res = await axios.put('/honjaya/points', {
        point: pointData,
      })
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

//이용자 신고
export const userReport = createAsyncThunk(
  'USER_REPORT',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/honjaya/reports', data)
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

const initialState = {}

const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {},
  extraReducers: {
  },
})

export default pointSlice.reducer
