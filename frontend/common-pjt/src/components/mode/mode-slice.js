import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userGender: '', //m, f
    total: undefined, //2, 4
    oppositeGender: undefined, //true, false
    roleCode: undefined, //1, 2, 3..
}

const modeSlice = createSlice({
    name : 'mode',
    initialState,
    reducers: {
        setUserGender: (state, action) => {
            console.log("setUserGender",action.payload)
            state.userGender = action.payload
        },
        setTotal: (state, action) => {
            
            state.total = action.payload   
        },
        setOppositeGender: (state, action) => {
            state.oppositeGender = action.payload
        },
        setRoleCode: (state, action) => {
            state.roleCode = action.payload
        }
    }
})

export const { setUserGender, setOppositeGender, setRoleCode, setTotal} = modeSlice.actions
export default modeSlice.reducer