import React from 'react'
import styled from 'styled-components'
import FormInputs from './FormInputs'
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
    color: #00c3a9;
    font-size: 2.3rem;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
    margin-top: 1rem;
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

const FormBox = styled.div`
  width: 90%;
  height: 90%;
`

const SignupForm = () => {

  return (
    <SignupFormBlock>
      <Logo>
        <img
          src={logoImg}
          alt="logo"
          style={{ height: '110%', paddingLeft: '1rem' }}
        />
      </Logo>
      <h3>회원가입</h3>
      <p>
        이미 회원이신가요?{' '}
        <Link to="/" className="Login">로그인하기</Link>
      </p>
      <FormBox>
        <FormInputs/>
      </FormBox>
    </SignupFormBlock>
  )
}

export default SignupForm
