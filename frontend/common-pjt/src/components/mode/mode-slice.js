import { createSlice } from '@reduxjs/toolkit'

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
        }
    }
})

export const { setRoleCode, setTotal, setMatchResponse } = modeSlice.actions
export default modeSlice.reducer
