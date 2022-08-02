import { createSlice } from '@reduxjs/toolkit'

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
  
  isEmailChecked: false,
  isNicknameChecked: false,
  
  loading: false,
  error: null,
}

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
    //이메일 중복 체크
    checkEmailStart(state) {
      state.loading = true
      state.error = null
    },
    //이메일 중복 체크 결과 담을 state
    changeCheckEmailField(state, action) {
      const isDuplicatedEmail = action.payload
      state.isEmailChecked = isDuplicatedEmail
    },
    //닉네임 중복 체크
    checkNicknameStart(state) {
      state.loading = true
      state.error = null
    },
    //닉네임 중복 체크 결과 담을 state
    changeCheckNicknameField(state, action) {
      const isDuplicatedNickname = action.payload
      state.isNicknameChecked = isDuplicatedNickname
    }
  },
})

export const signupActions = signupSlice.actions

export default signupSlice.reducer
