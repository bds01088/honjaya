import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'



// 별점 데이터 가져오기
export const getRate = createAsyncThunk(
  'GETRATE',
  async ( data, { rejectWithValue }) => {
    try {
      console.log("데이터가 오나?")
      const res = await axios.get(
        '/honjaya/rates/average',
      )
      console.log('별점 데이터')
      console.log(typeof(res.data.rateScore))
      return res
      } catch (err) {
        // console.log("err가 오고있나?")
        // console.log(err)
        return rejectWithValue(err.response) //err안에 response로 담겨있음
      }
    }
)


const initialState = {
  loading: false,
  score: 0,
  success: false,
  error: null
}

const rateSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {}
    }
  },
  extraReducers: {
    [getRate.pending]: (state) => {
      state.loading = true
    },
    [getRate.fulfilled]: (state, action) => {
      state.loading = false
      state.score = action.payload
      state.success = action.payload.data.success
    },
    [getRate.rejected]: (state, action) => {
      // console.log(action.payload)
      state.error = action.payload.error
    },
  }

})


export const { resetUser } = rateSlice.actions 

export default rateSlice.reducer
