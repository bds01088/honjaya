import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// 투표 결과 저장
export const storeResult = createAsyncThunk(
  'STORE_RESULT',
  async (userData, { rejectWithValue }) => {
    try {
      return userData
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

// connection 저장
export const storeConnection = createAsyncThunk(
  'STORE_CONNECTION',
  async (userData, { rejectWithValue }) => {
    try {
      return userData
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

// 내 투표 결과
export const doingVote = createAsyncThunk(
  'DOING_VOTE',
  async (data, { rejectWithValue }) => {
    try {
      return data
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)


const initialState = {
  result: {},
  vote: {},
  connections: {},
};


const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    setResult: (state) => {
      state.result = null || {}
    },
    setVote: (state) => {
      state.vote = null || {}
    },
    setConnections: (state) => {
      state.connections = null || {}
    }
  },
  extraReducers: {
    [storeResult.fulfilled]: (state, action) => {
      state.result[action.payload.clientData] = action.payload.roleCodes
    },
    [storeConnection.fulfilled]: (state, action) => {
      state.connections[action.payload[0]] = action.payload[1]
    },
    [doingVote.fulfilled]: (state, action) => {
      state.vote[action.payload.voteTo] = action.payload.voteRole
    },
  },
});


export const { setResult, setVote, setConnections } = voteSlice.actions

export default voteSlice.reducer
