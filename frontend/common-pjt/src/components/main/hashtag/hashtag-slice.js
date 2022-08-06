import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'
import { deleteToken, saveToken, getToken } from '../../../api/JWT'

//해시태그 데이터 가져오기
export const getHash = createAsyncThunk(
  'GET_HASH',
  async ( arg, { rejectWithValue }) => {
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
  'DEL_HASH',
  async ( hashNo, { rejectWithValue }) => {
    console.log(hashNo)
    try {
      const res = await axios.delete(
        `/honjaya/hashtags/${hashNo}`,
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

//해시태그 입력하기
export const putHash = createAsyncThunk(
  'PUTHASH',
  async ( hashContent, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/honjaya/hashtags/`,
        {
          hashText: `${hashContent}`
        }
      // {
      //   headers: {"access-Token": `${getToken()}` },
      // }
      )
      console.log(res)
      console.log("해시태그 생성 성공")
      return res
      } catch (err) {
        console.log("해시태그 생성 에러")
        console.log(err)
        return rejectWithValue(err.response) //err안에 response로 담겨있음
      }
  }
)




const initialState = {
  // loading: false,
  // list: [],
  // success: false,
  // error: null
  hashtagInfo: {},
  hashesOwned: [],
 

}

const hashTagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {
    resetHashtagInfo: (state) => {
      state.hashtagInfo = {}
    },
    saveNewHashtagInfo: (state, action) => {
      state.hashtagInfo = action.payload.data
    },
    loadHashesOwned: (state) => {
      console.log("뭐라도되라")
      const hashArray = state.hashtagInfo
      const tempHash = []
      Array.from(hashArray).forEach((hashDetailObject) => {
        Object.entries(hashDetailObject).forEach(([key, value]) => {
          if (key === 'hashNo') {
            tempHash.push([key, value])
          }
          else if (key === 'hashText') {
            tempHash.push([key, value])
          }
      
          state.hashesOwned = tempHash
        })
      })
    }
      // console.log(tempHash)
      
   

    // }
      // Object.entries(hashtagInfo.data).forEach(([list, hashDetailInfo]) => {
      //   // 
      //   if (hashDetailInfo === true) {
      //     Array.from(hashDetailInfo).forEach((hashDetailObject) => {
      //       state.hashesOwned.push(hashDetailObject)
            
            // Object.entries(hashDetailObject).forEach(([key, value]) => 
            //     state.hashesOwned.push([gameType, key]);
            //   }
  //         })
  //       }
  //     })
  //   }
  // },
  },
  extraReducers: {
    [getHash.pending]: (state, action) => {
      state.loading = true
      // state.hashtagInfo = action.payload.data.list
    },
    [getHash.fulfilled]: (state, action) => {
      // state.loading = false
      // console.log(action.payload)
      // action.payload는 response와 동일하다.
      // console.log(action.payload)
      state.hashtagInfo = action.payload.data.list
      
      // console.log(action.payload.data.list[0].hashText)
      // console.log(action.payload.data.list[0].hashNo)
      // console.log(typeof(action.payload.data.list))
      // console.log(state.hashtagInfo)
      // const hashArray = state.hashtagInfo
      // // console.log(hashArray)
      // const tempHash = []
      // Array.from(hashArray).forEach((hashDetailObject) => {
      //   Object.entries(hashDetailObject).forEach(([key, value]) => {
      //     if (key === 'hashNo') {
      //       tempHash.push([key, value])
      //     }
      //     else if (key === 'hashText') {
      //       tempHash.push([key, value])
      //     }
      
      //   })
      // })
      // console.log(tempHash)
      
      // state.hashesOwned = tempHash
      // console.log(state.hashesOwned)
      // state.success = action.payload.data.success
    },
    // [getHash.rejected]: (state, action) => {
    //   console.log(action.payload)
    //   state.error = action.payload.error
    // },
    // [delHash.pending]: (state) => {
    //   state.loading = true
    // },
    [delHash.fulfilled]: (state, action) => {
      // state.loading = false
      // state. = action.pyaload.data.list
      state.hashtagInfo = action.payload.data
    },
    // [delHash.rejected]: (state, action) => {
    //   state.loading = false
    //   state.error = action.payload.error
    // },
    [putHash.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.hastagInfo = action.payload.data
    },
  },
})


export const { resetHashtagInfo, saveNewHashtagInfo, loadHashesOwned} = hashTagSlice.actions 
export default hashTagSlice.reducer
