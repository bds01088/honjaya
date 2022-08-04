import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'
import { deleteToken, saveToken, getToken } from '../../../api/JWT'

//해시태그 데이터 가져오기
export const getHash = createAsyncThunk(
  'GETHASH',
  async ( data, { rejectWithValue }) => {
    try {
      console.log("데이터가 오나?")
      const res = await axios.get(
        '/honjaya/hashtags',
        //원래 headers에 토큰을 넣어주어야하지만
        //src/api/http.js가 axios요청 보낼 때 마다 인터셉트해서
        //config headers에 access-Token으로 값을 너어주고
        //config를 리턴해주기 때문에 넣을 필요가 없어짐
        // {
        //   headers: {"access-Token": `${getToken()}` },
        // }
      )
      console.log("해시태그 데이터 받아옴")
      //extraReducer가 지켜보고 있기 때문에,
      //진행상황에 따라 extraReducer도 실행된다.
      // console.log(res)
      return res
      } catch (err) {
        // console.log("err가 오고있나?")
        // console.log(err)
        return rejectWithValue(err.response) //err안에 response로 담겨있음
      }
    }
)

//해시태그 데이터 삭제요청 보내기
export const delHash = createAsyncThunk(
    'DELHASH',
    async ( hashNo, { rejectWithValue }) => {
      try {
        const res = await axios.delete(
          `/honjaya/hashtags/${hashNo}`,
        // {
        //   headers: {"access-Token": `${getToken()}` },
        // }
        )
        console.log("해시태그 데이터 삭제성공")
        return res
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
      // console.log(action.payload)
      //action.payload는 response와 동일하다.
      state.list = action.payload.data.list
      console.log(state.list)
      state.success = action.payload.data.success
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
