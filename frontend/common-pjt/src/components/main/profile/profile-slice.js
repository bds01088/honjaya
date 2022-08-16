import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../api/http'




//상대방 프로필 정보 불러오기
export const opponentUserProfile = createAsyncThunk(
  'OPPONENT_USER_PROFILE',
  async ( userNo, {rejectWithValue}) => {
    try {
      const res = await axios.get(`/honjaya/users/info/${userNo}`,)
      console.log(res)
      return res
    }
    catch (err) {
      return rejectWithValue(err.response)
    }
  }
)






const initialState = {
  userNickname:'',
  userProfilePicUrl:'',
  userGender:'',
  hashtags:[],
  rateScore:1

}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [opponentUserProfile.fulfilled]: (state, action) => {
      //console.log(action.payload.data)
      state.userNickname = action.payload.data.userNickname
      state.userProfilePicUrl = action.payload.data.userProfilePicUrl
      state.userGender = action.payload.data.userGender
      state.hashtags = action.payload.data.hashtags
      state.rateScore = action.payload.data.rateScore
      
    },
  }

})


export const { } = profileSlice.actions 

export default profileSlice.reducer
