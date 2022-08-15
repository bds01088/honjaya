import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'
import { deleteToken, saveToken, getToken } from '../../../api/JWT'

//해시태그 데이터 가져오기
export const getHash = createAsyncThunk(
  'GET_HASH',
  async (arg, { rejectWithValue }) => {
    try {
      console.log('데이터가 오나?')
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
      console.log('해시태그 데이터 받아옴')
      //extraReducer가 지켜보고 있기 때문에,
      //진행상황에 따라 extraReducer도 실행된다.
      return res
    } catch (err) {
      return rejectWithValue(err.response) //err안에 response로 담겨있음
    }
  },
)

//해시태그 데이터 삭제요청 보내기
export const delHash = createAsyncThunk(
  'DEL_HASH',
  async (hashNo, { rejectWithValue }) => {
    console.log(hashNo)
    try {
      const res = await axios.delete(`/honjaya/hashtags/${hashNo}`)
      console.log('해시태그 데이터 삭제성공')
      return res
    } catch (err) {
      console.log('err가 오고있나?')
      console.log(err)
      return rejectWithValue(err.response) //err안에 response로 담겨있음
    }
  },
)

//해시태그 입력하기
export const putHash = createAsyncThunk(
  'PUTHASH',
  async (hashContent, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/honjaya/hashtags/`,
        {
          hashText: `${hashContent}`,
        },
      )
      console.log(res)
      console.log('해시태그 생성 성공')
      return res
    } catch (err) {
      console.log('해시태그 생성 에러')
      console.log(err)
      return rejectWithValue(err.response) //err안에 response로 담겨있음
    }
  },
)

const initialState = {
  hashesOwned: [],
}

const hashTagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getHash.fulfilled]: (state, action) => {
      const hashArray = action.payload.data.list
      console.log(hashArray)
      const tempHash = []
      //현재 hashArray 구조
      // [{hashNo: 1, hashText: "내용"}, ...]
      //hashNo랑 hashText만 필요함
      //map 
      hashArray.map((item, idx) => {
        const temp = [item.hashNo, item.hashText];
        tempHash.push(temp)
      })
      // 아래와 같이 값을 명시해서 콘솔에 찍어줄 수도 있음
      console.log("결과는", tempHash)
      state.hashesOwned = tempHash

    },

    [delHash.fulfilled]: (state, action) => {
      console.log(action.payload.data)
      const response = action.payload.data
      

   
    },

    [putHash.fulfilled]: (state, action) => {
      // console.log(action.payload)
      // putHash 요청 뒤에 초기값에 값이 제대로 세팅되지 않아서 아래로직을 이용해 추가해줌
      const response = action.payload.data
      const temp = [response.hashNo, response.hashText];
      state.hashesOwned.push(temp)
      console.log("추가 후", state.hashesOwned)      
    },
  },
})

export const { } = hashTagSlice.actions
export default hashTagSlice.reducer
