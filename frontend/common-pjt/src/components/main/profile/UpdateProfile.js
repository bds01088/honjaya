import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'
import profileImg from '../../../assets/shadow.png'
import { loadUser } from '../../auth/login/login-slice'
import { checkNickname, modifyUserInfo } from '../../auth/signup/signup-slice'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`

const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 25%;
    background-color: #CCF3EE;
    /* outline: 1px solid; */
`

const Logo = styled.img`
  height: 50%;
`


const ProfileContainer = styled.div`
  position: absolute;
  /* z-index: 1; */
  top: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;
  /* inline: block; */
  /* outline: 2px solid; */
  `

const ImgBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 30%;
  height: 100%;
  /* outline: 1px solid red; */
  `
const ProfileImg = styled.div`
  height: 85%;
  width: 35%;
  border-radius: 70%;
  background-color: #333333;
`

const Container = styled.div`
  position: relative;
  display: flex;
  /* position: absolute; */
  justify-content: center;
  width: 100%;
  height: 75%;
  /* outline: 2px solid; */
`

const FormBox = styled.form`
  position: absolute;
  /* left: 1; */
  display: flex;
  margin-left: 6rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
  /* outline: 2px solid blue; */

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`
const InfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  height: 70%;
  margin-top: 3rem;
  /* outline: 2px solid green; */
`

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-evenly;
  width: 40%;
  /* outline: 2px solid; */
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
`

const GenderSelect = styled.select`
  width: 78%;
  height: 3rem;
  display: flex;
  border-radius: 0.5rem;
  border: 1.5px solid #333333;
  font-family: "Jua";
  font-size: 1.3rem;
  cursor: pointer;
  &:focus {
    border: 3px solid #00cfb4;
  }
`

const GenderOption = styled.option`
  /* font-family: "Jua"; */
  display: flex;
  justify-content: center;
  
`

const StyledInput = styled.input`
  background-color: white;
  border: 1.5px solid #333333;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  padding: 1rem 0.5rem;
  width: 70%;
  height: 1rem;
  font-family: Jua;
  /* cursor: pointer; */
  /* outline: 2px solid navy; */

  &:focus {
    border: 3px solid #00cfb4;
  }
  & + & {
    margin-top: 1rem;
  }

  &.email {
    width: 70%;
  }

  &.nickname {
    width: 50%;
    margin-right: 1.5rem;
    
  }

  &.birth {
    width: 75%;
  }
`

const Label = styled.div`
  font-family: "Jua";
  font-size: 1rem;
`
const StyledBtn = styled.button`
  height: 3rem;
  background-color: #00cfb4;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1rem;
  font-family: Jua;
  cursor: pointer;

  &:hover{
    background-color: #009c87;
    color: #e0e0e0;
  }
`

const CheckDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* outline: 1px solid red; */
  flex-direction: column;
`

const BirthdayDiv = styled.div`
  width: 93%;
  display: flex;
  justify-content: space-between;
  /* outline: 1px solid red; */
  flex-direction: column;
`

const InBtn = styled.button`
  background-color: #FF728E;
  color: white;
  width: 10%;
  border-radius: 0.5rem;
  border: 0;
  padding: 0.5rem;
  /* margin: 1rem 0; */
  font-size: 1.2rem;
  font-family: Jua;
  cursor: pointer;

  &:hover{
    background-color: #FF5066;
    color: #e0e0e0;
  }
`
const ErrorText = styled.span`
  width: 100%;
  color: #FF0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`
const SuccessText = styled.span`
  width: 100%;
  color: #009c87;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const UpdateDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-right: 4rem;
  /* outline: 1px solid; */
`


// 누누가 들고온 회원가입 데이터
const UpdateProfile = () => {
  //이름이랑 이메일은 수정불가
  //필드 값 변경
  const [userNickname, setUserNickname] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userGender, setUserGender] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userBirthday, setUserBirthday] = useState('')
 

  // 필드 유효성검사
  const [nicknameValid, setNicknameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)



  // console.log(userBirthday)
  // console.log(userGender)
  // console.log(userGender)

  //닉네임 중복 체크 여부 변수
  // t: 사용가능, f: 사용불가능
  const [isDuplicateNicknameChecked, setisDuplicateNicknameChecked] = useState(false)
  
  // 비밀번호 재확인 변수
  const [checkedPwd, setCheckedPwd] = useState(true)


  // 비밀번호 유효성 검사
  const validatePwd = (e) => {
    var patternEngAtListOne = new RegExp(/[a-zA-Z]+/); // + for at least one
    var patternSpeAtListOne = new RegExp(/[~!@#$%^]+/); // + for at least one
    var patternNumAtListOne = new RegExp(/[0-9]+/); // + for at least one

    if (e.target.value) {
      setDefaultPwd(true)
    } else { setDefaultPwd(false) }


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
    if ( defaultPwd && pwdValid 
      && (e.target.value === document.querySelector(".userPassword").value)
    ){
      return setCheckedPwd(true);
    } else return setCheckedPwd(false);
  }
  // 닉네임 유효성 검사 | 2~10자 이하의 한글,영어,숫자만
  const validateNickname = (e) => {
    if(e.target.value) { setDefaultNickname(true) 
      } else { setDefaultNickname(false) }

    let regexp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (regexp.test(e.target.value) && e.target.value.length <= 10 && e.target.value.length >= 2) 
      return setNicknameValid(true);
    else return setNicknameValid(false); 
  }

  // 성별 선택
  const genderList = ["남" , "여"]
  const changeGender = (e) => {
      setUserGender(e.target.value)
    }
  
  // 전화번호 유효성 검사 및 형식 자동 변환
  const checkPhone = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setUserPhone(e.target.value);
    }
  }

  useEffect(() => {
    if (userPhone.length === 10) {
      setUserPhone(userPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (userPhone.length === 13) {
      setUserPhone(userPhone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [userPhone]);



  // default에서 닉네임 에러 메시지 방지
  const [defaultPwd, setDefaultPwd] = useState(false)
  const [defaultNickname, setDefaultNickname] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  //기존 유저 정보 로드
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err)=> {alert.err("에러지롱")})
  },[])


  //닉네임 중복 체크
  function isValidNickname() {
    dispatch(checkNickname(userNickname))
    .unwrap()
    .then((res) => {
      if (res.data.trueOrFalse === false) { return setisDuplicateNicknameChecked(true) 
      } else return setisDuplicateNicknameChecked(false)
    })
    .catch((err) => {
      if (err.status === 500) {
        navigate('/error')
      }
    })
  }
  // 기존 유저정보 이메일이랑 이름은 변동사항 없어서 그냥 가져다 써도됨
  const { userEmail, userName } = useSelector((state) => state.login.user)

  //변수명이 데이터필드랑 겹쳐서, 기존 유저정보 받을려면 새로 변수선언해야되
  //여기서 생일이랑 성별 기존정보 양식맞춰서 받아서 쓰면됨
  const nowUserInfo = useSelector(state => state.login.user)
  const nowUserNickname = nowUserInfo.userNickname
  const nowUserPhone = nowUserInfo.userPhone

  //회원정보 변경 요청
  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      userEmail,
      userNickname,
      userPassword,
      userGender,
      userBirthday,
      userName,
      userPhone,
    }
    dispatch(modifyUserInfo(data))
      // console.log(data)
      .unwrap()
      .then(() => {
        alert('회원정보가 수정되었습니다')
      })
      .catch((err) => {
        if (err.status === 401) {
          alert(
            "입력하신 정보를 한번 더 확인해주세요"
          );
        } else if (err.status === 500) {
          navigate('/error')
        }
      });
  }
  
  
  

  // console.log("usergender : "+userGender)
  // console.log("패스워드 재확인 체크 : "+checkedPwd)
  // console.log("패스워드 유효성 체크 : "+ pwdValid)
  // // console.log("올바른 전화번호인지 : " + {userphone})
  // // console.log("성별 체크 했는지 : " + usergender)
  // console.log("닉네임 유효성 : " +nicknameValid )
  // console.log("닉네임 중복 검사 : " + isDuplicateNicknameChecked)

  return (

    <Background>
        <Header>
            <Logo src={logo}></Logo>
        </Header>

        <ProfileContainer>
          <ImgBox>
            <ProfileImg src={profileImg}></ProfileImg>
            <ProfileImg src={profileImg}></ProfileImg>
          </ImgBox>
        </ProfileContainer>

        <Container>
          <FormBox onSubmit={(e) => { if (checkedPwd && isDuplicateNicknameChecked && userBirthday && userGender && userPhone) handleSubmit(e) }}>
            <InfoBox>
              <LeftBox>

                <CheckDiv>
                  <Label>닉네임</Label>
                  <div>
                  <StyledInput
                    className="nickname"
                    autoComplete="userNickname" 
                    name="userNickname"
                    placeholder={nowUserNickname}
                    onChange={(e) => {
                      setUserNickname(e.target.value) 
                      if(isDuplicateNicknameChecked) { setisDuplicateNicknameChecked(false) }
                    }}
                    value={userNickname}
                    onBlur={(e) => {
                      validateNickname(e)
                    }}
                  ></StyledInput>
                  <StyledBtn 
                    type="button" 
                    onClick={(e) => {
                    if(nicknameValid && defaultNickname){
                      isValidNickname(e)
                    }
                    }}>확인</StyledBtn>
                    </div>
                  </CheckDiv>

                  { defaultNickname && !nicknameValid ? 
                  <ErrorText>닉네임은 2~10자 이하의 한글,영어,숫자만 입력할 수 있어요</ErrorText> : 
                  ( defaultNickname && nicknameValid && !isDuplicateNicknameChecked ? 
                  <ErrorText>닉네임 중복확인이 필요합니다.</ErrorText> : null )}
                  { isDuplicateNicknameChecked ? 
                  <SuccessText>사용 가능한 닉네임입니다.</SuccessText> : null}
                  
                  <div>
                    <Label>이름(수정불가)</Label>
                    <StyledInput
                      autoComplete="userName"
                      disabled={true}
                      name="userName"
                      value={userName}
                    ></StyledInput>
                  </div>

                  <div>
                    <Label>전화번호</Label>
                    <StyledInput
                    autoComplete="userPhone"
                    name="userPhone"
                    placeholder={nowUserPhone}
                    onChange={checkPhone}
                    onBlur={(e) => {
                      console.log(e.target.value);
                      this.onChange(e)
                    }}
                    value={userPhone}
                    ></StyledInput>
                  </div>
                  

                  <CheckDiv>
                    <Label>이메일(수정불가)</Label>
                    <StyledInput
                      type="email"
                      disabled={true}
                      value={userEmail}
                      className="email"
                      >
                    </StyledInput>
                  </CheckDiv>
              </LeftBox>
            
              <RightBox>

                <BirthdayDiv>
                  <Label>생년월일</Label>
                  <StyledInput
                    type="date"
                    autoComplete="userBirthday"
                    name="userBirthday"
                    className="birth"
                    onChange={(e) => setUserBirthday(e.target.value)}
                    value={userBirthday}
                  ></StyledInput>
                </BirthdayDiv>
                  
                <CheckDiv>
                  <Label>성별</Label>
                  <div>
                     
                    <GenderSelect onChange={changeGender} value={userGender}>
                      {genderList.map((item) => (
                        <GenderOption value={item} key={item}>
                          {item}
                        </GenderOption>
                      ))}
                    </GenderSelect>
                    
                  </div>
                </CheckDiv>
                
                <div>
                  <Label>비밀번호</Label>
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
                    { !pwdValid && defaultPwd ? <ErrorText>비밀번호는 8~15자의 영어, 숫자, 기호(~!@#$%^)를 조합해주세요</ErrorText> : null }
                </div>

                <div>
                  <Label>비밀번호 확인</Label>
                  <StyledInput
                    type="password"
                    autoComplete="userPassword"
                    placeholder="비밀번호 확인"
                    onBlur={checkPassword}
                  ></StyledInput>
                  { pwdValid ? 
                  ( checkedPwd ? null : <ErrorText>비밀번호가 일치하지 않습니다</ErrorText>) : null }
                </div>
              </RightBox>
            </InfoBox>
            
             {/* 테스트용 회원가입 폼 그대로 가지고옴 */}
            


            


            

              {/* <StyledInput
                autoComplete="userProfilePicUrl"
                name="userProfilePicUrl"
                placeholder="프로필 사진(선택)"
                onChange={onChange}
                value={form.userProfilePicUrl}
              ></StyledInput> */}

            <UpdateDiv>
              <InBtn>수정</InBtn>
            </UpdateDiv>
          </FormBox>

        </Container>
    </Background>
  
  )
}

export default UpdateProfile
