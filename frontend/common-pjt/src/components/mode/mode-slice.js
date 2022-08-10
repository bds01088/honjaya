import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/http'

export const matchDataGet = createAsyncThunk(
    'MATCH_DATA_GET',
    async (data, {rejectWithValue}) => {
        try {
            const res = await axios.post('https://i7e104.p.ssafy.io/honjaya/meetings/ready',data)
            return res.data
        } catch (err) {
        return rejectWithValue(err.response)
        }
    }
)

const initialState = {
    total: undefined, //2, 4
    roleCode: undefined, //1, 2, 3..
    matchResponse: undefined
}

const modeSlice = createSlice({
    name : 'mode',
    initialState,
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload
        },
        setRoleCode: (state, action) => {
            state.roleCode = action.payload
        },
        setMatchResponse: (state, action) => {
            state.matchResponse = action.payload
            console.log(state.matchResponse)
        }
    }
})

export const { setRoleCode, setTotal, setMatchResponse } = modeSlice.actions
export default modeSlice.reducer
