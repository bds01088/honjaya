import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'
import { loadUser } from '../../auth/login/login-slice'
import { checkNickname } from '../../auth/signup/signup-slice'
import { useSelector,useDispatch } from 'react-redux'
const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`

const Header = styled.div`
    display: flex;
    justify-content: center;
`

const Logo = styled.img`
  /* position: fixed; */
  /* display: inline; */
  margin-left: 2rem;
`

// 체크용 회원가입폼 그대로 가지고옴


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
//여기까지 체크용 회원가입 폼 그대로 가지고옴











const Container = styled.div`

`

const ImgBox = styled.div`

`

//회원가입 인풋 블락 디자인 일단 그대로 가지고왔어용
const FormBox = styled.form`
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

const LeftBox = styled.div`

`
const RightBox = styled.div`
`

const UpdateBtn = styled.div`

`


const UpdateProfile = () => {
  //이름이랑 이메일은 수정불가
  //필드 값 변경
  const [newUserNickname, setUserNickname] = useState('')
  const [newUserPassword, setUserPassword] = useState('')
  const [newUserGender, setUserGender] = useState('')
  const [newUserPhone, setUserPhone] = useState('')
  const [newUserBirthday, setUserBirthday] = useState('')
 

  // 필드 유효성검사
  const [nicknameValid, setNicknameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)
  const [checkPwd, setCheckPwd] = useState(true)

  //닉네임 중복 체크 여부 변수
  const [isDuplicateNicknameChecked, setisDuplicateNicknameChecked] = useState(false)

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

    // 성별 선택
    const changeGender = (e) => {
      setUserGender(e.target.value)
    }
  
    // 전화번호 유효성 검사 및 형식 자동 변환
    const checkPhone = (e) => {
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(e.target.value)) {
        setUserPhone(e.target.value);
        console.log(e.target.value)
      }
    }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err)=> {alert.err("에러지롱")})
  },[])


  //닉네임 중복 체크
  function isValidNickname(e) {
    e.preventDefault()
    dispatch(checkNickname(userNickname))
    .unwrap()
    .then((res) => {
      console.log(res.data.trueOrFalse)
      if (res.data.trueOrFalse === false) {
        setisDuplicateNicknameChecked(true)
      }
      res.data.trueOrFalse ? alert('사용 불가능한 닉네임입니다') : alert('사용 가능한 닉네임입니다')
    })
    .catch((err) => {
      if (err.status === 500) {
        console.log("대체뭐가문제냐")
        // navigate('/error')
      }
    })
  }
  
  const { userEmail, userNickname, userName, userPhone, userBirthday  } = useSelector((state) => state.login.user)
  return (

    <Background>
        <Header>
            <Logo src={logo}></Logo>
        </Header>

        <Container>
        
            <ImgBox>
            </ImgBox>

            <FormBox>
              {/* 테스트용 회원가입 폼 그대로 가지고옴 */}
              <CheckDiv>
                <StyledInput
                  type="email"
                  autoComplete="newUserEmail"
                  name="newUserEmail"
                  placeholder={userEmail}
                  value={userEmail}
                  >
                  </StyledInput>
              </CheckDiv>


              <StyledInput
                type="password"
                autoComplete="userPassword"
                name="userPassword"
                className="userPassword"
                placeholder="비밀번호"
                onChange={(e) => setUserPassword(e.target.value)}
                value={newUserPassword}
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
                  placeholder={userNickname}
                  onChange={(e) => setUserNickname(e.target.value)}
                  value={newUserNickname}
                  onBlur={validateNickname}
                ></StyledInput>
                <StyledBtn onClick={isValidNickname}>중복확인</StyledBtn>
              </CheckDiv>
              { nicknameValid ? null : <ErrorText>닉네임은 2~10자 이하의 한글,영어,숫자만 입력할 수 있어요</ErrorText>}
              <StyledInput
                autoComplete="userName"
                name="userName"
                placeholder="이름"
                value={userName}
              ></StyledInput>
    

              <CheckDiv>
                <StyledInput
                  type="date"
                  autoComplete="userBirthday"
                  name="userBirthday"
                  onChange={(e) => setUserBirthday(e.target.value)}
                  value={newUserBirthday}
                  className="birth"
                ></StyledInput>

                <div>
                  <label>
                    <input name="newUserGender" type="radio" value="m" checked={newUserGender==="m"} onChange={changeGender}/>남
                  </label>
                  <label>
                    <input name="newUserGender" type="radio" value="f" checked={newUserGender==="f"} onChange={changeGender}/>여
                  </label>
                </div>

              </CheckDiv>


              <StyledInput
                
                autoComplete="userPhone"
                name="userPhone"
                placeholder="승현이가수정해준대"
                onChange={checkPhone}
                onBlur={(e) => {
                  console.log(e.target.value);
                  this.onChange(e)
                }}
                value={newUserPhone}
              ></StyledInput>

              {/* <StyledInput
                autoComplete="userProfilePicUrl"
                name="userProfilePicUrl"
                placeholder="프로필 사진(선택)"
                onChange={onChange}
                value={form.userProfilePicUrl}
              ></StyledInput> */}

              <InBtn>계정 생성하기</InBtn>

            {/* 여기까지 체크용 회원가입폼 그대로 가지고옴 */}
                <LeftBox>

                </LeftBox>

                <RightBox>
                </RightBox>

                <UpdateBtn>
                </UpdateBtn>
            </FormBox>

        </Container>
    </Background>
  
  )
}

export default UpdateProfile
