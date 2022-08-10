import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    total: undefined, //2, 4
    roleCode: undefined, //1, 2, 3..
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
        }
    }
})

export const { setRoleCode, setTotal} = modeSlice.actions
export default modeSlice.reducer
