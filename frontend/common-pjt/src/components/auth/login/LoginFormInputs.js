import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './login-slice'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginFormInputsBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
`

const StyledInput = styled.input`
  background-color: white;
  border: 1.5px solid #333333;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  padding: 1rem 0.5rem;
  width: 95%;
  height: 1rem;
  font-family: Jua;

  &:focus {
    border: 3px solid #adff45;
  }
  & + & {
    margin-top: 1.5rem;
  }

  &.email {
    width: 95%;
  }

  &.password {
    width: 95%;
  }

`

const StyledBtn = styled.button`
  height: 100%;
  background-color: #00cfb4;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1rem;
  font-family: Jua;

  &:hover{
    background-color: #009c87;
    color: #e0e0e0;
  }
`

const LoginBtn = styled.div`
  background-color: #FF728E;
  color: white;
  width: 95%;
  text-align: center;
  border-radius: 0.5rem;
  padding: 1rem 0.5rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  font-family: Jua;

  &:hover{
    background-color: #FF728E;
    color: #e0e0e0;
  }
`

const GoInBtn = styled.div`
  background-color: #00cfb4;
  color: white;
  width: 95%;
  text-align: center;
  border-radius: 0.5rem;
  padding: 1rem 0.5rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  font-family: Jua;

  &:hover{
    background-color: #009c87;
    color: #e0e0e0;
  }
`



const LoginFormInputs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userEmail, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')

  function handleSubmit(e) {
    console.log(e)
    e.preventDefault()
    const data = {
      userEmail,
      userPassword
    }
    dispatch(login(data))
    .unwrap()
    .then(() => {
      navigate.push('/main')
    })
    .catch((err) => {
      if (err.status === 400) {
        toast.error('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
      } else if (err.status === 401) {//refresh token 발급
        console.log('토큰발급필요')
      } else if (err.status === 403) {
        toast.error('신고누적으로 사용이 정지된 유저입니다')
      } else if (err.status === 500) {
        navigate.push('/error')
      } 
      })
  }


  return (
    <>
      <LoginFormInputsBlock
      onSubmit = {handleSubmit}
      >
      <StyledInput
        autoComplete="userEmail"
        name="userEmail"
        placeholder="이메일을 입력하세요"
        onChange={(e) => setEmail(e.target.value)}
        value={userEmail}
        className="email"
      ></StyledInput>
      <StyledInput
        type="password"
        autoComplete="userPassword"
        name="userPassword"
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => setPassword(e.target.value)}
        value={userPassword}
        className="password"
        
      ></StyledInput>
      <button>테스트</button>
      <LoginBtn>로그인</LoginBtn>
      </LoginFormInputsBlock>
      <GoInBtn>회원가입</GoInBtn>
    </>

  
  );
};

export default LoginFormInputs;