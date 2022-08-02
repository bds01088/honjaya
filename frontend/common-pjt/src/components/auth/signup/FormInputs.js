import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const FormInputsBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
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
    width: 75%;
  }

  &.nickname {
    width: 75%;
  }

  &.birth {
    width: 75%;
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

const CheckDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`

const InBtn = styled.button`
  background-color: #00cfb4;
  color: white;
  width: 100%;
  
  border-radius: 0.5rem;
  border: 0;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  font-family: Jua;

  &:hover{
    background-color: #009c87;
    color: #e0e0e0;
  }
`

const ErrorText = styled.span`
  width: 100%;
  color: #FF0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const FormInputs = ({form, onChange, onSubmit, isValidEmail, isValidNickname, error}) => {
  const [userGender, setUserGender] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  const [phone, setPhone] = useState('')


  const changeGender = (e) => {
    setUserGender(e.target.value)
    onChange(e)
  }

  const validateEmail = (e) => {
    // ^ 시작일치, $ 끝 일치
    // {2, 3} 2개 ~ 3개
    // * 0회 이상, + 1회 이상
    // [-_.] - 또는 _ 또는 .
    // ? 없거나 1회
    let regexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regexp.test(e.target.value)) setEmailValid(true);
    else  setEmailValid(false); 
  }

  const checkPhone = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
      console.log(e.target.value)
    }
  }


  useEffect(() => {
    if (phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phone.length === 13) {
      setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phone]);


  // console.log(form)
  return (
    <FormInputsBlock onSubmit={onSubmit}>

      <CheckDiv>
        <StyledInput
          type="email"
          autoComplete="userEmail"
          name="userEmail"
          placeholder="이메일"
          onChange={onChange}
          value={form.userEmail}
          className="email"
          onBlur={validateEmail}>
          </StyledInput>

        <StyledBtn>인증하기</StyledBtn>
      </CheckDiv>
      { emailValid ? null : <ErrorText>유효하지 않은 이메일입니다.</ErrorText>}

      <StyledInput
        type="password"
        autoComplete="userPassword"
        name="userPassword"
        placeholder="비밀번호"
        onChange={onChange}
        value={form.userPassword}
      ></StyledInput>

      <StyledInput
        type="password"
        autoComplete="userPassword"
        placeholder="비밀번호 확인"
      ></StyledInput>

      <CheckDiv>
        <StyledInput
          className="nickname"
          autoComplete="userNickname"
          name="userNickname"
          placeholder="닉네임"
          onChange={onChange}
          value={form.userNickname}
        ></StyledInput>
        <StyledBtn onClick={isValidNickname}>중복확인</StyledBtn>
      </CheckDiv>

      <StyledInput
        autoComplete="userName"
        name="userName"
        placeholder="이름"
        onChange={onChange}
        value={form.userName}
      ></StyledInput>

      <CheckDiv>
        <StyledInput
          type="date"
          autoComplete="userBirthday"
          name="userBirthday"
          onChange={onChange}
          value={form.userBirthday}
          className="birth"
        ></StyledInput>

        <div>
          <label>
            <input name="userGender" type="radio" value="m" checked={userGender==="m"} onChange={changeGender}/>남
          </label>
          <label>
            <input name="userGender" type="radio" value="f" checked={userGender==="f"} onChange={changeGender}/>여
          </label>
        </div>

      </CheckDiv>


      <StyledInput
        autoComplete="userPhone"
        name="userPhone"
        placeholder="전화번호 ex)010-0000-0000"
        onChange={checkPhone}
        onBlur={(e) => {
          console.log(e.target.value);
          onChange(e)
        }}
        value={phone}
      ></StyledInput>

      {/* <StyledInput
        autoComplete="userProfilePicUrl"
        name="userProfilePicUrl"
        placeholder="프로필 사진(선택)"
        onChange={onChange}
        value={form.userProfilePicUrl}
      ></StyledInput> */}


      <InBtn>계정 생성하기</InBtn>

    </FormInputsBlock>
  )
}

export default FormInputs
