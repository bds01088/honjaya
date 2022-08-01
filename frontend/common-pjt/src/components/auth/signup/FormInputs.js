import React from 'react';
import styled from 'styled-components';

const FormInputsBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
  h3 {
    margin: 0;
    color: black;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  background-color: white;
  border: 3px solid black;
  font-size: 1.2rem;
  padding: 1rem 0.5rem;
  width: 100%;
  height: 100%;
  &:focus {
    border: 3px solid #adff45;
  }
  & + & {
    margin-top: 1.5rem;
  }
`;

const FormInputs = ({form, onChange, onSubmit, error}) => {
  console.log(form)
  return (
    <FormInputsBlock>
      <h3>회원가입</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete='userEmail'
          name="userEmail"
          placeholder="이메일을 입력하세요"
          onChange={onChange}
          value={form.userEmail}
        ></StyledInput>
        <StyledInput
          autoComplete='userPassword'
          name="userPassword"
          placeholder="비밀번호를 입력하세요"
          onChange={onChange}
          value={form.userPassword}
        ></StyledInput>
        <StyledInput
          autoComplete='userNickname'
          name="userNickname"
          placeholder="닉네임을 입력하세요"
          onChange={onChange}
          value={form.userNickname}
        ></StyledInput>
        <StyledInput
          autoComplete='userName'
          name="userName"
          placeholder="이름을 입력하세요"
          onChange={onChange}
          value={form.userName}
        ></StyledInput>
        <StyledInput
          autoComplete='userBirthday'
          name="userBirthday"
          placeholder="생일을 입력하세요"
          onChange={onChange}
          value={form.userBirthday}
        ></StyledInput>
        <StyledInput
          autoComplete='userGender'
          name="userGender"
          placeholder="성별을 입력하세요"
          onChange={onChange}
          value={form.userGender}
        ></StyledInput>
        <StyledInput
          autoComplete='userPhone'
          name="userPhone"
          placeholder="전화번호를 입력하세요"
          onChange={onChange}
          value={form.userPhone}
        ></StyledInput>
        <StyledInput
          autoComplete='userProfilePicUrl'
          name="userProfilePicUrl"
          placeholder="사진을 추가하세요"
          onChange={onChange}
          value={form.userProfilePicUrl}
        ></StyledInput>
        <button>가입</button>
      </form>
    </FormInputsBlock>
  );
};

export default FormInputs;
