import React from 'react';
import styled from 'styled-components';
import FormInputs from './FormInputs';
import { useDispatch, useSelector } from 'react-redux';
import { signupActions } from './signup-slice';

const SignupFormBlock = styled.div`
  width: 50%;
  height: 80%;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`


const SignupForm = () => {

  const dispatch = useDispatch()

  const { form, loginError } = useSelector((state) => ({
    form: state.signup.register,
    loginError: state.signup.error,
  }));



  // 1. 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    console.log(e)
    let { name, value } = e.target;
    dispatch(
      signupActions.changeField({
        key: name,
        value,
      })
    )
  };

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(signupActions.createUserStart(form))
  }
  return (
    <SignupFormBlock>
      <FormInputs
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={loginError}
      ></FormInputs>
    </SignupFormBlock>
  );
};

export default SignupForm;