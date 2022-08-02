import React from 'react'
import styled from 'styled-components'
import LoginFormInputs from './LoginFormInputs'
import logoImg from '../../../assets/logo.png'
import { Link } from 'react-router-dom'


const LoginFormBlock = styled.div`
  width: 30rem;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Logo = styled.div`
  text-align: center;
  width: 100%;
  height: 12%;
`




const LoginForm = () => {


  return (
    <LoginFormBlock>
    <Logo><img src={logoImg} alt="logo" style={{ height: '100%'}}/></Logo> 

    {/* <p>이미 회원이신가요? <Link to="/login" className="Login">로그인하기</Link></p> */}
    <LoginFormInputs></LoginFormInputs>
  </LoginFormBlock>
  );
};

export default LoginForm