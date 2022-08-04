import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { checkNickname, signup, setNicknameCheckedFalse } from './signup-slice'


const FormInputsBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
    border: 3px solid #00cfb4;
  }
  & + & {
    margin-top: 1rem;
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
  height: 3rem;
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
  margin-top: 1rem;
  margin-bottom: 1rem;

  
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

const FormInputs = () => {
  // 필드 유효성검사
  const [emailValid, setEmailValid] = useState(true)
  const [nicknameValid, setNicknameValid] = useState(true)
  const [nameValid, setNameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)
  const [checkPwd, setCheckPwd] = useState(true)
  
  const [userGender, setUserGender] = useState('')
  const [phone, setPhone] = useState('')

  // 닉네임 이메일 중복체크 // 머징 이메일 중복체크 인증으로 대체하는거야?
  const { isNicknameChecked, isEmailChecked, isloading } = useSelector((state) => state.signup)
  
  //전체 필드 검사 완료
  const [ isValidSignupForm, setisValidSignupForm ] = useState(false)

  //닉네임 중복 검사 완료
  // const [ isValidNickname, setisValidNickname ] = useState(false)
  
  
  //필드 값 입력
  const [userEmail, setUserEmail] = useState('')
  const [userNickname, setUserNickname] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [userBirthday, setUserBirthday] = useState('')
  
  // const [userPhone, setUserPhone] = useState('')

  
  // const errRef = useRef(null);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // function handleNickname(e) {
  //   const { value } = e.target;
  //   if (isNicknameChecked) {
  //     dispatch(setNicknameCheckedFalse()) //중복이면
  //   }
  //   if (value.length < 7) {
  //     setNickname(value.replace(/\s/g, ''));
  //     return true;
  //   }
  //   return false;
  // }




  //changeGender 보류
  const changeGender = (e) => {
    setUserGender(e.target.value)
  }

  // 이메일 유효성 검사
  const validateEmail = (e) => {
    // ^ 시작일치, $ 끝 일치
    // {2, 3} 2개 ~ 3개
    // * 0회 이상, + 1회 이상
    // [-_.] - 또는 _ 또는 .
    // ? 없거나 1회
    let regexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regexp.test(e.target.value)) setEmailValid(true);
    else setEmailValid(false); 
  }

  // 비밀번호 유효성 검사
  const validatePwd = (e) => {
    var patternEngAtListOne = new RegExp(/[a-zA-Z]+/); // + for at least one
    var patternSpeAtListOne = new RegExp(/[~!@#$%^]+/); // + for at least one
    var patternNumAtListOne = new RegExp(/[0-9]+/); // + for at least one

    console.log(e.target.value)
    if( patternEngAtListOne.test( e.target.value ) 
        && patternSpeAtListOne.test( e.target.value )  
        && patternNumAtListOne.test( e.target.value )
        && e.target.value.length >= 8
        && e.target.value.length <= 15
    ){
        return setPwdValid(true);
    }
    else return setPwdValid(false);
  }

  // 비밀번호 확인
  const checkPassword = (e) => {
    if (pwdValid 
      && (e.target.value === document.querySelector(".userPassword").value)
    ){
      return setCheckPwd(true);
    } else return setCheckPwd(false);
  }

  // 닉네임 유효성 검사 | 2~10자 이하의 한글,영어,숫자만
  const validateNickname = (e) => {
    let regexp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (regexp.test(e.target.value) && e.target.value.length <= 10 && e.target.value.length >= 2) 
      setNicknameValid(true);
    else setNicknameValid(false); 
  }

  // 이름 유효성 검사 | 1~30자
  const validateName = (e) => {
    if (e.target.value.length <= 30 && e.target.value.length >= 1) 
      setNameValid(true);
    else setNameValid(false); 
  }

  // 전화번호 유효성 검사 및 형식 자동 변환
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


  // useEffect(() => {
  //   setTimeout(() => {
  //     if (isNicknameChecked) {
  //       isValidNickname(true)
  //     } else {
  //       isValidNickname(false)
  //     }
  //   }, 10);
  // }, [userNickname, isNicknameChecked]);

  // console.log(isDuplicateChNickname)
  

  function isValidNickname(e) {
    e.preventDefault()
    dispatch(checkNickname(userNickname))
    .unwrap()
    .then((res) => {
      console.log(res.data.trueOrFalse)
      res.data.trueOrFalse ? alert('사용 불가능한 닉네임입니다') : alert('사용 가능한 닉네임입니다')
    })
    .catch((err) => {
      if (err.status === 500) {
        console.log("대체뭐가문제냐")
        // navigate('/error')
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      userEmail,
      userNickname,
      userPassword,
      userGender,
      userBirthday,
      userName,
      userNickname,
      phone
    }
    dispatch(signup(data))
      .unwrap()
      .then(() => {
        alert('가입성공')
      })
      .catch((err) => {
        if (err.status === 401) {
          alert(
            "입력하신 정보를 한번 더 확인해주세요"
          );
        } else if (err.status === 500) {
          console.log('이게무슨문제야')
          navigate('/error')
        }
      });
  }
  
  return (
    <FormInputsBlock onSubmit={handleSubmit}>

      <CheckDiv>
        <StyledInput
          type="email"
          autoComplete="userEmail"
          name="userEmail"
          placeholder="이메일"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          className="email"
          onBlur={validateEmail}>
          </StyledInput>
        <StyledBtn>인증하기</StyledBtn>
      </CheckDiv>
      { emailValid ? null : <ErrorText className='errorText'>유효하지 않은 이메일입니다.</ErrorText>}

      <StyledInput
        type="password"
        autoComplete="userPassword"
        name="userPassword"
        className="userPassword"
        placeholder="비밀번호"
        onChange={(e) => setUserPassword(e.target.value)}
        value={userPassword}
        onBlur={validatePwd}
      ></StyledInput>
      { pwdValid ? null : <ErrorText>비밀번호는 8~15자의 영어, 숫자, 기호(~!@#$%^)를 조합해주세요</ErrorText>}

      <StyledInput
        type="password"
        autoComplete="userPassword"
        placeholder="비밀번호 확인"
        onBlur={checkPassword}
      ></StyledInput>
      { pwdValid ? 
        ( checkPwd ? null : <ErrorText>비밀번호가 일치하지 않습니다</ErrorText>) : null }

      <CheckDiv>
        <StyledInput
          className="nickname"
          autoComplete="userNickname" 
          name="userNickname"
          placeholder="닉네임"
          onChange={(e) => setUserNickname(e.target.value)}
          value={userNickname}
          onBlur={validateNickname}
        ></StyledInput>
        <StyledBtn onClick={isValidNickname}>중복확인</StyledBtn>
      </CheckDiv>
      { nicknameValid ? null : <ErrorText>닉네임은 2~10자 이하의 한글,영어,숫자만 입력할 수 있어요</ErrorText>}

      <StyledInput
        autoComplete="userName"
        name="userName"
        placeholder="이름"
        onChange={(e) => setUserName(e.target.value)}
        onBlur={validateName}
        value={userName}
      ></StyledInput>
      { nameValid ? null : <ErrorText>이름은 1~30자로 입력할 수 있어요</ErrorText>}

      <CheckDiv>
        <StyledInput
          type="date"
          autoComplete="userBirthday"
          name="userBirthday"
          onChange={(e) => setUserBirthday(e.target.value)}
          value={userBirthday}
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
          this.onChange(e)
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
