import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'
import { loadUser } from '../../auth/login/login-slice'
import { checkNickname, modifyUserInfo } from '../../auth/signup/signup-slice'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

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
  background-color: #ccf3ee;
`

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 75%;
`

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 75%;
`

const FormBox = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  position: absolute;
  margin-left: 4rem;
  bottom: 1rem;
  width: 50%;
  height: 100%;
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
`

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
`

const GenderSelect = styled.select`
  width: 77%;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1.5px solid #333333;
  font-family: Minseo;
  font-size: 1.3rem;
  cursor: pointer;
  &:focus {
    border: 3px solid #00cfb4;
  }
`

const GenderOption = styled.option``

const StyledInput = styled.input`
  background-color: white;
  border: 1.5px solid #333333;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  padding: 1rem 0.5rem;
  width: 70%;
  height: 1rem;
  font-family: Minseo;

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
    width: 45%;
    margin-right: 1.5rem;
  }

  &.birth {
    width: 75%;
    cursor: pointer;
  }
`

const Label = styled.div`
  font-family: 'Minseo';
  font-size: 1.4rem;
`
const StyledBtn = styled.button`
  height: 3rem;
  width: 3rem;
  background-color: #00cfb4;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.5rem;
  font-family: Minseo;

  cursor: pointer;

  &:hover {
    background-color: #009c87;
    color: #e0e0e0;
  }
`

const CheckDiv = styled.div``

const BirthdayDiv = styled.div`
  width: 93%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Btn = styled.button`
  &.update {
    background-color: #00cfb4;
    color: white;
    width: 100%;
    border-radius: 0.5rem;
    border: 0;
    padding: 0.5rem;
    font-size: 1.5rem;
    font-family: Minseo;
    cursor: pointer;

    &:hover {
      background-color: #009c87;
      color: #e0e0e0;
    }
  }

  &.cancel {
    background-color: #ff728f;
    color: white;
    width: 100%;
    border-radius: 0.5rem;
    border: 0;
    padding: 0.5rem;
    font-size: 1.5rem;
    font-family: Minseo;
    cursor: pointer;

    &:hover {
      background-color: #ed5c7a;
      color: #e0e0e0;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`
const ErrorText = styled.span`
  color: #ff0000;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: 'Minseo';
`
const SuccessText = styled.span`
  color: #009c87;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: 'Minseo';
`

const UpdateDiv = styled.div`
  display: flex;
  width: 30%;
`

const CacelDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
`

const CancelLink = styled(Link)`
  display: flex;
  width: 100%;
`

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 30%;
  margin-right: 4rem;
`

const UpdateProfile = () => {
  // 기존 유저정보 이메일이랑 이름은 변동사항 없어서 그냥 가져다 써도됨
  const { userEmail, userName } = useSelector((state) => state.login.user)

  //변수명이 데이터필드랑 겹쳐서, 기존 유저정보 받을려면 새로 변수선언해야되
  //여기서 생일이랑 성별 기존정보 양식맞춰서 받아서 쓰면됨
  const nowUserInfo = useSelector((state) => state.login.user)
  const nowUserNickname = nowUserInfo.userNickname
  const nowUserPhone = nowUserInfo.userPhone
  const nowuserBirthday = nowUserInfo.userBirthday
  const nowUserGender = nowUserInfo.userGender
  const nowUserPassword = nowUserInfo.userPassword

  //이름이랑 이메일은 수정불가
  //필드 값 변경
  const [userNickname, setUserNickname] = useState(nowUserNickname)
  const [userPhone, setUserPhone] = useState(nowUserPhone)
  const [userBirthday, setUserBirthday] = useState(nowuserBirthday)
  const [userGender, setUserGender] = useState(nowUserGender)
  const [userPassword, setUserPassword] = useState(nowUserPassword)

  // 필드 유효성검사
  const [nicknameValid, setNicknameValid] = useState(true)
  const [pwdValid, setPwdValid] = useState(true)

  //닉네임 중복 체크 여부 변수
  // t: 사용가능, f: 사용불가능
  const [isDuplicateNicknameChecked, setisDuplicateNicknameChecked] =
    useState(true)

  // 비밀번호 재확인 변수
  const [checkedPwd, setCheckedPwd] = useState(false)

  // 비밀번호 유효성 검사
  const validatePwd = (e) => {
    var patternEngAtListOne = new RegExp(/[a-zA-Z]+/) // + for at least one
    var patternSpeAtListOne = new RegExp(/[~!@#$%^]+/) // + for at least one
    var patternNumAtListOne = new RegExp(/[0-9]+/) // + for at least one

    if (e.target.value) {
      setDefaultPwd(true)
    } else {
      setDefaultPwd(false)
    }

    if (
      patternEngAtListOne.test(e.target.value) &&
      patternSpeAtListOne.test(e.target.value) &&
      patternNumAtListOne.test(e.target.value) &&
      e.target.value.length >= 8 &&
      e.target.value.length <= 15
    ) {
      return setPwdValid(true)
    } else return setPwdValid(false)
  }

  // 비밀번호 확인
  const checkPassword = (e) => {
    if (
      defaultPwd &&
      pwdValid &&
      e.target.value === document.querySelector('.userPassword').value
    ) {
      return setCheckedPwd(true)
    } else return setCheckedPwd(false)
  }
  // 닉네임 유효성 검사 | 2~10자 이하의 한글,영어,숫자만
  const validateNickname = (e) => {
    if (e.target.value) {
      setDefaultNickname(true)
    } else {
      setDefaultNickname(false)
    }

    let regexp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/
    if (
      regexp.test(e.target.value) &&
      e.target.value.length <= 10 &&
      e.target.value.length >= 2
    )
      return setNicknameValid(true)
    else return setNicknameValid(false)
  }

  // 성별 선택
  const changeGender = (e) => {
    setUserGender(e.target.value)
  }

  // 전화번호 유효성 검사 및 형식 자동 변환
  const [checkedPhone, setCheckedPhone] = useState(false)
  const checkPhone = (e) => {
    const regex = /^[0-9\b -]{0,13}$/
    if (regex.test(e.target.value)) {
      setUserPhone(e.target.value)
    }
  }

  useEffect(() => {
    if (userPhone !== undefined && userPhone.length === 10) {
      setUserPhone(userPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'))
    }
    if (userPhone !== undefined && userPhone.length === 13) {
      setCheckedPhone(true)
      setUserPhone(
        userPhone
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      )
    } else {
      setCheckedPhone(false)
    }
  }, [userPhone])

  // default에서 닉네임 에러 메시지 방지
  const [defaultPwd, setDefaultPwd] = useState(true)
  const [defaultPwdCheck, setDefaultPwdCheck] = useState(false)
  const [defaultNickname, setDefaultNickname] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  //기존 유저 정보 로드
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err) => {
        alert.err('에러지롱')
      })
  }, [])

  //닉네임 중복 체크
  function isValidNickname() {
    dispatch(checkNickname(userNickname))
      .unwrap()
      .then((res) => {
        if (
          userNickname === nowUserNickname ||
          res.data.trueOrFalse === false
        ) {
          return setisDuplicateNicknameChecked(true)
        } else return setisDuplicateNicknameChecked(false)
      })
      .catch((err) => {
        if (err.status === 500) {
          history.push('/error')
        }
      })
  }

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
      .unwrap()
      .then(() => {
        alert('회원정보가 수정되었습니다')
      })
      .catch((err) => {
        if (err.status === 401) {
          alert('입력하신 정보를 한번 더 확인해주세요')
        } else if (err.status === 500) {
          history.push('/error')
        }
      })
  }

  // 아래 모든 조건 만족시 수정 버튼 활성화
  let disabled = true
  if (
    isDuplicateNicknameChecked && // 닉네임 중복확인
    nicknameValid && // 닉네임 유효성 확인
    checkedPwd && // 비밀번호 재확인
    pwdValid && // 비밀번호 유효성 확인
    userBirthday && // 생일 입력 확인
    checkedPhone // 전화번호 유효성 확인
  ) {
    disabled = false
  }

  return (
    <Background>
      <Header>
        <LogoDiv>
          <Logo src={logo}></Logo>
        </LogoDiv>
      </Header>

      <Container>
        <FormBox
          onSubmit={(e) => {
            if (
              checkedPwd &&
              isDuplicateNicknameChecked &&
              userBirthday &&
              userGender &&
              userPhone
            )
              handleSubmit(e)
          }}
        >
          <InfoBox>
            <LeftBox>
              <CheckDiv>
                <Label>닉네임</Label>
                <div>
                  <StyledInput
                    className="nickname"
                    autoComplete="userNickname"
                    name="userNickname"
                    onChange={(e) => {
                      setUserNickname(e.target.value)
                      if (isDuplicateNicknameChecked) {
                        setisDuplicateNicknameChecked(false)
                      }
                    }}
                    value={userNickname}
                    onBlur={(e) => {
                      validateNickname(e)
                    }}
                  ></StyledInput>
                  <StyledBtn
                    type="button"
                    onClick={(e) => {
                      if (nicknameValid && defaultNickname) {
                        isValidNickname(e)
                      }
                    }}
                  >
                    확인
                  </StyledBtn>
                </div>

                {defaultNickname && !nicknameValid ? (
                  <ErrorText>
                    닉네임은 2~10자 이하의 한글,영어,숫자만 입력할 수 있어요
                  </ErrorText>
                ) : defaultNickname &&
                  nicknameValid &&
                  !isDuplicateNicknameChecked ? (
                  <ErrorText>닉네임 중복확인이 필요합니다.</ErrorText>
                ) : null}
                {nowUserNickname !== userNickname &&
                isDuplicateNicknameChecked ? (
                  <SuccessText>사용 가능한 닉네임입니다.</SuccessText>
                ) : null}
              </CheckDiv>

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
                  onChange={checkPhone}
                  placeholder={nowUserPhone}
                  onBlur={(e) => {
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
                ></StyledInput>
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
                    <GenderOption value="m" key="m">
                      남
                    </GenderOption>
                    <GenderOption value="f" key="f">
                      여
                    </GenderOption>
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
                  onChange={(e) => {
                    setUserPassword(e.target.value)
                  }}
                  value={userPassword}
                  onBlur={validatePwd}
                ></StyledInput>
                {!pwdValid && defaultPwd ? (
                  <ErrorText>
                    비밀번호는 8~15자의 영어, 숫자, 기호(~!@#$%^)를 조합해주세요
                  </ErrorText>
                ) : null}
              </div>

              <div>
                <Label>비밀번호 확인</Label>
                <StyledInput
                  type="password"
                  autoComplete="userPassword"
                  placeholder="비밀번호 확인"
                  onChange={(e) => {
                    if (e.target.value) {
                      setDefaultPwdCheck(true)
                    } else {
                      setDefaultPwdCheck(false)
                    }
                  }}
                  onBlur={checkPassword}
                ></StyledInput>
                <div>
                  {pwdValid && !checkedPwd && defaultPwdCheck ? (
                    <ErrorText>비밀번호가 일치하지 않습니다</ErrorText>
                  ) : null}
                </div>
              </div>
            </RightBox>
          </InfoBox>

          <BtnDiv>
            <UpdateDiv>
              <Btn className="update" disabled={disabled}>
                수정
              </Btn>
            </UpdateDiv>

            <CacelDiv>
              <CancelLink to="/main" style={{ textDecoration: 'none' }}>
                <Btn className="cancel">취소</Btn>
              </CancelLink>
            </CacelDiv>
          </BtnDiv>
        </FormBox>
      </Container>
    </Background>
  )
}

export default UpdateProfile
