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
};


const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
  },
  extraReducers: {
    [storeResult.fulfilled]: (state, action) => {
      state.result[action.payload.clientData] = action.payload.roleCodes
    },
    [doingVote.fulfilled]: (state, action) => {
      state.vote[action.payload.voteTo] = action.payload.voteRole
    }
  },
});


// export const { } = voteSlice.actions

export default voteSlice.reducer
