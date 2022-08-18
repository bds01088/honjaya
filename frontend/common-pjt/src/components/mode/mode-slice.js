import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const exitMatching = createAsyncThunk(
    'EXIT_MATCHING',
    async (data, {rejectWithValue}) => { 
        try {
            const res = await axios.get('https://i7e104.p.ssafy.io/honjaya/meetings/cancel',)
            return res
            } catch (err) {
                return rejectWithValue(err.response)
            
            }

        }    
)

const initialState = {
    result: undefined,
    roleCode: undefined,
    total: undefined,
    unauthorized: undefined,
    user: {},
    uuid: undefined,
    pairUser: {},
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
        },
        
    },
    extraReducers: {
        [matchDataGet.fulfilled]: (state, action) => {
            const { result, roleCode, total, unauthorized, user, uuid,pairUser } = action.payload
            state.result = result
            state.roleCode = roleCode
            state.total = total
            state.unauthorized = unauthorized
            state.user = user
            state.uuid = uuid
            state.pairUser = pairUser
        }
    }
})

export const { setRoleCode, setTotal, setMatchResponse } = modeSlice.actions
export default modeSlice.reducer
