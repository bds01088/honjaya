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

//상대 평균 평가 점수 가져오기
export const getOtherRate = createAsyncThunk(
  'GET_OTHER_RATE',
  async ( userNo, { rejectWithValue }) => {
    try {
      console.log("해당유저 점수 get", userNo)
      const res = await axios.get(`/honjaya/rates/average/${userNo}`)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

//내가 해당 특정 유저를 평가했는지 내역 조회
export const getRateRecord = createAsyncThunk(
  'GET_RATE_LIST',
  async ( userNo, { rejectWithValue}) => {
    try {
      console.log("이사람을 평가했었나?", userNo)
      const res = await axios.get(`/honjaya/rates/${userNo}`)
      console.log("평가응답", res)
    //{
    //   "rateNo": 0,
    //   "rateFrom": 7,
    //   "rateTo": 8,
    //   "rateScore": 0.0, => 0점일때 평가 안한거, 0점은 줄 수 없음
    //   "success": true
    //}
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

//평가 수정하기
export const putRate = createAsyncThunk(
  'PUT_RATE',
  async ( rateData, { rejectWithValue }) => {
    try {
      console.log("평가 수정하기", rateData)
      const res = await axios.put(
        `honjaya/rates/${rateData.rateNo}`,
        {
          rateScore : rateData.rateScore
        }
      )
      console.log("평가수정 res", res)
      return res
    }
    catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

//평가하기 보내기
export const setRate = createAsyncThunk(
  'SET_RATE',
  async ( rateData , { rejectWithValue }) => {
    try {
      console.log("평가하기", rateData)
      //data : {
      //   rateFrom : int,
      //   rateTo : int,
      //   rateScore : double
      //}
      const res = await axios.post('/honjaya/rates/', rateData )
      console.log("평가보내기 응답",res)
    }
    catch (err) {
      return rejectWithValue(err.response)
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
