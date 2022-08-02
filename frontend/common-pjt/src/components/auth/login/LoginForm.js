// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Container, Button, makeStyles } from '@material-ui/core';
// import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
// import { useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { deleteToken } from '../../../api/JWT';
// import { login } from './login-slice.js';
// import logo from '../../../assets/logo.png';


// const Wrapper = styled(Container)`
//   display: flex;
//   height: 100vh;
//   justify-content: center;
//   align-items: center;
// `;

// const LogoWrapper = styled(Container)`
//   display: flex;
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const Logo = styled.img`
//   width: 100%;
//   height: 100%;
//   flex: 1;
//   margin-bottom: 10px;
// `;

// const LoginContainer = styled.div`
//   height: 100vh;
//   display: flex;
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// export const CommonTextValidator = styled(TextValidator)`
//   opacity: 0.8;
//   width: 100%;
//   height: 70px;
//   font-size: 10px;
//   font-color: red;
//   padding: 1em 0 1em 0;
//   border: red 3px;

//   & label {
//     color: black;
//     font-weight: bold;
//   }

//   & .MuiOutlinedInput-input {
//     border-radius: 6px;
//     background-color: #ffffff;
//     padding: 0.6em;
//   }

//   & .MuiOutlinedInput-notchedOutline {
//     opacity: 0;
//   }
//   margin-bottom: ${(props) => (props.islogininput ? '15px' : '0')};
// `;

// const useStyles = makeStyles({
//   validatorForm: {
//     width: '90%',
//   },
//   button: {
//     background: 'linear-gradient(45deg, #ff859f 30%, #ffa87a 70%)',
//     borderRadius: 7,
//     border: 0,
//     fontWeight: 'bold',
//     color: 'white',
//     height: 40,
//     marginTop: '10px',
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     '&:hover': {
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 70%)',
//     },
//   },
// });

// export const CommonButton = styled(Button)`
//   width: 100%;
//   border-radius: 6px;
//   margin: 1em 0 0.25em;
//   padding: 0.4em 1em;
//   background: ${(props) => (props.yellow ? '#fbd14b' : '#9fa9d8')};
//   color: ${(props) => (props.mauve ? 'white' : '#7a7a7a')};

//   &:hover {
//     background: ${(props) => (props.yellow ? '#ffce00' : '#8090d8')};
//     color: ${(props) => (props.mauve ? 'white' : '#262626')};
//   }

//   &:disabled {
//     opacity: 0.35;
//     color: ${(props) => (props.mauve ? 'white' : 'black')};
//   }
// `




// const Login = () => {
  
//   const classes = useStyles();
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
  
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   function handleSubmit(e) {
//     e.preventDefault();
//     const data = {
//       email,
//       password,
//     };
//     dispatch(login(data))
//       .unwrap()
//       .then(() => {
//         navigate.push('/');
//       })
//       .catch((err) => {
//         if (err.status === 400) {
//           toast.error('😥 입력하신 정보를 다시 확인해주세요');
//         } else if (err.status === 409) {
//           toast.error('😥 이미 로그인된 사용자입니다');
//         } else if (err.status === 401) {
//           toast.error('😥 아이디와 비밀번호를 다시 확인해주세요');
//           deleteToken();
//           navigate.push('/login');
//         } else if (err.status === 500) {
//           navigate.push('/error');
//         }
//       });
//   }
  
//   // render
//   return (
//     <Wrapper>
//       <LogoWrapper>
//         <Logo to="/" src={logo} />
//       </LogoWrapper>
  
//       <LoginContainer>
//         <ValidatorForm
//           onSubmit={handleSubmit}
//           className={classes.validatorForm}
//         >
//           <CommonTextValidator
//             islogininput="true"
//             label="이메일"
//             onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
//             name="email"
//             value={email}
//             validators={['required', 'isEmail']}
//             errorMessages={[
//               '정보를 입력해주세요',
//               '이메일 형식으로 입력해주세요',
//             ]}
//             variant="outlined"
//             autoFocus
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <CommonTextValidator
//             label="비밀번호"
//             onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
//             value={password}
//             name="password"
//             type="password"
//             validators={['required']}
//             errorMessages={['정보를 입력해주세요']}
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <CommonButton yellow="true" type="submit">
//             로그인
//           </CommonButton>
//           <Link to="/signup">
//             <CommonButton mauve="true">회원가입</CommonButton>
//           </Link>
//         </ValidatorForm>
//       </LoginContainer>
//     </Wrapper>
//   );
// }



// export default Login


import React from 'react'
import styled from 'styled-components'
import LoginFormInputs from './LoginFormInputs'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from './login-slice'
import logoImg from '../../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

const LoginFormBlock = styled.div`
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




const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      email,
      password
    }
    dispatch(loginActions(data))
    .unwrap()
    .then(() => {
      navigate.push('/main')
    })
    .catch((err) => {
      if (err.status === 400) {
        toast.error('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
      } 
    })
  }

  return (
    <LoginFormBlock>
    <Logo><img src={logoImg} alt="logo" style={{ height: '100%'}}/></Logo> 

    {/* <p>이미 회원이신가요? <Link to="/login" className="Login">로그인하기</Link></p> */}
    <LoginFormInputs
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      // isValidEmail={isValidEmail}
      // isValidNickname={isValidNickname}
      error={loginError}
    ></LoginFormInputs>
  </LoginFormBlock>
  );
};

export default Login;