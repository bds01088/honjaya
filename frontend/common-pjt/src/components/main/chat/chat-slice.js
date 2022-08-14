import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../../api/http'


export const requestDirectMessage = createAsyncThunk(
  'REQUEST_DIRECT_MESSAGE',
  async (oppositeUserNo, {rejectWithValue}) => {
      try {
          const res = await axios.post(`https://i7e104.p.ssafy.io/honjaya/chats/ask/${oppositeUserNo}`)
          return res
      } catch (err) {
      return rejectWithValue(err.response)
      }
  }
)

export const findAllRoom = createAsyncThunk(
  'FIND_ALL_ROOM',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axios.get('https://i7e104.p.ssafy.io/honjaya/chats/list', )
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }

  }
)

export const enterRoom = createAsyncThunk(
  'ENTER_ROOM',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axios.get('https://i7e104.p.ssafy.io/honjaya/users/userno',)
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const getChatRoomDetail = createAsyncThunk(
  'GET_CHAT_ROOM_DETAIL',
  async (chatRoomNo, {rejectWithValue}) => {
    try {
      const res = await axios.get(`https://i7e104.p.ssafy.io/honjaya/chats/chatroom/${chatRoomNo}`)
      return res
    } catch (err) {
      return rejectWithValue(err.response) 
    }
  }
)
const initialState = {
  chatRooms : [],
  myUserNo: 1,
  opponentNickname: '',
  opponentUserNo: 1


}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {

  },
  extraReducers: {
    [findAllRoom.fulfilled] : (state, action) => {
      state.chatRooms = action.payload.data.list
    },
    [enterRoom.fulfilled] : (state,action) => {
      state.myUserNo = action.payload.data.userNo
    },
    [getChatRoomDetail.fulfilled] : (state,action) => {
      state.opponentUserNo = action.payload.data.userNo
      state.opponentNickname = action.payload.data.userNickname
    }
  }
})

export const {} = chatSlice.actions
export default chatSlice.reducer