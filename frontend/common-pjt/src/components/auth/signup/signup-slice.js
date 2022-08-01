import { createSlice } from '@reduxjs/toolkit';

const initialSignupState = {
  //register
  register: {
    userEmail: '',
    userPassword: '',
    userNickname: '',
    userName: '',
    userBirthday: '',
    userGender: '',
    userPhone: '',
    userProfilePicUrl: '',
  },
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState: initialSignupState,
  reducers: {
    changeField(state, action) {
      console.log(action);
      const { key, value } = action.payload;
      state['register'][key] = value; //여기서 state는 위에서 내가 설정해준 초기state
    },
    //회원가입
    createUserStart(state) {
      state.loading = true;
      state.error = null;
    },
  },
});

export const signupActions = signupSlice.actions;

export default signupSlice.reducer;
