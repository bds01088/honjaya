import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../api/http'

// DM 보내기
export const requestDirectMessage = createAsyncThunk(
  'REQUEST_DIRECT_MESSAGE',
  async (oppositeUserNo, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://i7e104.p.ssafy.io/honjaya/chats/ask/${oppositeUserNo}`,
      )
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

// 채팅목록 불러오기
export const findAllRoom = createAsyncThunk(
  'FIND_ALL_ROOM',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        'https://i7e104.p.ssafy.io/honjaya/chats/list',
      )
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

// 채팅방 입장
export const enterRoom = createAsyncThunk(
  'ENTER_ROOM',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        'https://i7e104.p.ssafy.io/honjaya/users/userno',
      )
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

// 채팅내역 조회
export const getChatRoomDetail = createAsyncThunk(
  'GET_CHAT_ROOM_DETAIL',
  async (chatRoomNo, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://i7e104.p.ssafy.io/honjaya/chats/chatroom/${chatRoomNo}`,
      )
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

// 채팅 나가기
export const deleteChat = createAsyncThunk(
  'DELETE_ROOM',
  async (chatRoomNo, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://i7e104.p.ssafy.io/honjaya/chats/exit/${chatRoomNo}`,
      )
      return res
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
)

const initialState = {
  chatRooms: [],
  myUserNo: 1,
  opponentNickname: '',
  opponentUserNo: 1,
  isMatched: false,
  userProfilePicUrl: '',
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: {
    [findAllRoom.fulfilled]: (state, action) => {
      state.chatRooms = action.payload.data.list
    },
    [enterRoom.fulfilled]: (state, action) => {
      state.myUserNo = action.payload.data.userNo
    },
    [getChatRoomDetail.fulfilled]: (state, action) => {
      state.opponentUserNo = action.payload.data.userNo
      state.opponentNickname = action.payload.data.userNickname
      state.userProfilePicUrl = action.payload.data.userProfilePicUrl
    },
    [requestDirectMessage.fulfilled]: (state, action) => {
      state.isMatched = action.payload.data.trueOrFalse
    },
  },
})

export default chatSlice.reducer
