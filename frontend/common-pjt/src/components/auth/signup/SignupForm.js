import React from 'react'
import styled from 'styled-components'
import FormInputs from './FormInputs'
// import { useDispatch, useSelector } from 'react-redux'
// import { signupActions } from './signup-slice'
import logoImg from '../../../assets/logo.png'
import { Link } from 'react-router-dom'

const SignupFormBlock = styled.div`
  width: 30rem;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  h3 {
    margin: 0;
    color: #00C3A9;
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
  }

  .Login {
    color: #333333;
  }
`

const Logo = styled.div`
  text-align: center;
  width: 100%;
  height: 12%;
`

const SignupForm = () => {

  // const dispatch = useDispatch()

  // const { form, loginError } = useSelector((state) => ({
  //   form: state.signup.register,
  //   loginError: state.signup.error,
  // }))



  // // 1. 인풋 변경 이벤트 핸들러
  // const onChange = (e) => {
  //   console.log(e)
  //   let { name, value } = e.target;
  //   dispatch(
  //     signupActions.changeField({
  //       key: name,
  //       value,
  //     })
  //   )
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(signupActions.createUserStart(form))
  // }

  // const isValidEmail = (e) => {
  //   const email = form.userEmail
  //   dispatch(signupActions.checkEmailStart(email))
  // }
  
  // const isValidNickname = (e) => {
  //   const nickname = form.userNickname
  //   dispatch(signupActions.checkNicknameStart(nickname))
  // }


  
  return (
    <SignupFormBlock>
      <Logo><img src={logoImg} alt="logo" style={{ height: '100%'}}/></Logo> 
      <h3>회원가입</h3>
      <p>이미 회원이신가요? <Link to="/" className="Login">로그인하기</Link></p>
      <FormInputs
        // form={form}
        // onChange={onChange}
        // onSubmit={onSubmit}
        // isValidEmail={isValidEmail}
        // isValidNickname={isValidNickname}
        // error={loginError}
      ></FormInputs>
    </SignupFormBlock>
  )
}

export default SignupForm