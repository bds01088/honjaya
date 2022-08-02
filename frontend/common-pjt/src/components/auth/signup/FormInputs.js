import React, { useState } from 'react'
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

const InBtn = styled.div`
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

const FormInputs = ({form, onChange, onSubmit, isValidEmail, isValidNickname, error}) => {
  const [userGender, setUserGender] = useState('m')
  
  const changeGender = (e) => {
    setUserGender(e.target.value)
    onChange(e)
  }

  // console.log(form)
  return (
    <FormInputsBlock onSubmit={onSubmit}>

      <CheckDiv>
        <StyledInput
          autoComplete="userEmail"
          name="userEmail"
          placeholder="이메일을 입력하세요"
          onChange={onChange}
          value={form.userEmail}
          className="email"
        ></StyledInput>

        <StyledBtn onClick={isValidEmail}>인증하기</StyledBtn>
      </CheckDiv>

      <StyledInput
        autoComplete="userPassword"
        name="userPassword"
        placeholder="비밀번호를 입력하세요"
        onChange={onChange}
        value={form.userPassword}
      ></StyledInput>

      <CheckDiv>
        <StyledInput
          className="nickname"
          autoComplete="userNickname"
          name="userNickname"
          placeholder="닉네임을 입력하세요"
          onChange={onChange}
          value={form.userNickname}
        ></StyledInput>
        <StyledBtn onClick={isValidNickname}>중복확인</StyledBtn>
      </CheckDiv>

      <StyledInput
        autoComplete="userName"
        name="userName"
        placeholder="이름을 입력하세요"
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
        placeholder="전화번호를 입력하세요"
        onChange={onChange}
        value={form.userPhone}
      ></StyledInput>

      <StyledInput
        autoComplete="userProfilePicUrl"
        name="userProfilePicUrl"
        placeholder="사진을 추가하세요"
        onChange={onChange}
        value={form.userProfilePicUrl}
      ></StyledInput>


      <InBtn>계정 생성하기</InBtn>

    </FormInputsBlock>
  )
}

export default FormInputs
