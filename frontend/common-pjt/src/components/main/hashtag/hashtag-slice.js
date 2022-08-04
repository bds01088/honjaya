import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'
import { deleteToken, saveToken } from '../../../api/JWT'

//해시태그 데이터 가져오기
export const getHash = createAsyncThunk(
  'GETHASH',
  async ( { rejectWithValue }) => {
    try {
      const res = await axios.post('/honjaya/hashtags')
      console.log("해시태그 데이터 받아옴")
      console.log(res)
      return res
      // saveToken(token)
      } catch (err) {
        console.log("err가 오고있나?")
        console.log(err)
        return rejectWithValue(err.response) //err안에 response로 담겨있음
      }
    }
)

//해시태그 데이터 삭제요청 보내기
export const delHash = createAsyncThunk(
    'DELHASH',
    async ( hashNo, { rejectWithValue }) => {
      try {
        const res = await axios.delete(`/honjaya/hashtags/${hashNo}`)
        console.log("해시태그 데이터 삭제성공")
        return res
        // saveToken(token)
        } catch (err) {
          console.log("err가 오고있나?")
          console.log(err)
          return rejectWithValue(err.response) //err안에 response로 담겨있음
        }
    }
)

const initialState = {
  loading: false,
  list: [],
  success: false,
  error: null
}

const hashTagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {}
    }
  },
  extraReducers: {
    [getHash.pending]: (state) => {
      state.loading = true
    },
    [getHash.fulfilled]: (state, action) => {
      state.loading = false
      console.log(action.payload)
      state.list = action.payload.list
      state.success = action.payload.success
    },
    [getHash.rejected]: (state, action) => {
      console.log(action.payload)
      state.error = action.payload.error
    },
    [delHash.pending]: (state) => {
      state.loading = true
    },
    [delHash.fulfilled]: (state, action) => {
      state.loading = false
    }
  }

})


export const { resetUser } = hashTagSlice.actions 
export default hashTagSlice.reducer
