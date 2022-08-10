import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'


//포인트 감소
export const usePoint = createAsyncThunk(
  'USE_POINT',
  async ( pointData, {rejectWithValue}) => {
    try {
      console.log("포인트 변경됨")
      const res = await axios.put(
        '/honjaya/points',
        {
          point: pointData,
        },
      )
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)


const initialState = {

}

const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [usePoint.fulfilled]: (state, action) => {
      //console.log(action.payload.data)
      console.log(action.payload.data)
    },
  }

})


export const { } = pointSlice.actions 

export default pointSlice.reducer