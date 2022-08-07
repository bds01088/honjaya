import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'



// 별점 데이터 가져오기
export const getRate = createAsyncThunk(
  'GET_RATE',
  async ( arg, { rejectWithValue }) => {
    try {
      console.log("별점데이터옴?")
      const res = await axios.get(
        '/honjaya/rates/average',
      )
      return res
      } catch (err) {
        return rejectWithValue(err.response) //err안에 response로 담겨있음
      }
    }
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
    }
    
  },
  extraReducers: {
    [getRate.fulfilled]: (state, action) => {
      //console.log(action.payload.data)
      state.rateInfo = action.payload.data;
    },
  }

})


export const { resetRateInfo } = rateSlice.actions 

export default rateSlice.reducer
