import React from 'react'
import styled from 'styled-components'
import LoginFormInputs from './LoginFormInputs'
import logoImg from '../../../assets/logo.png'
import { useHistory } from 'react-router-dom'


const LoginFormBlock = styled.div`
  width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Logo = styled.img.attrs({ src: `${logoImg}` })`
  height: 10%;
  margin-bottom: 1.5rem;
`

const GoInBtn = styled.div`
  background-color: #00cfb4;
  color: white;
  width: 100%;
  text-align: center;
  border-radius: 0.5rem;
  padding: 1rem 0rem;
  font-size: 1.2rem;
  font-family: Jua;
  margin-bottom: 25%;

  &:hover{
    background-color: #009c87;
    color: #e0e0e0;
  }
`


const LoginForm = () => {
  const history = useHistory()

  return (
    <LoginFormBlock>
      <Logo/> 
      {/* <p>이미 회원이신가요? <Link to="/login" className="Login">로그인하기</Link></p> */}
      <LoginFormInputs/>
      <GoInBtn onClick={() => history.push('/pledge')}>회원가입</GoInBtn>
    </LoginFormBlock>
  );
};

export default LoginForm