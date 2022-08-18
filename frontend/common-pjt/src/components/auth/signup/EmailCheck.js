import styled from 'styled-components'
import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'

export const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  font-family: Minseo;

  h2 {
    font-size: 2rem;
  }
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: #fffdde;
  border: 0.2rem solid #88866f;
  border-radius: 30px;
  color: #47463c;
  position: relative;
`

const BackIcon = styled(MdClear)`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
`

const InputHash = styled.input`
  width: 95%;
  font-family: Minseo;
  font-size: 1.8rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1.8px solid #333333;
  color: #333333;

  &:focus {
    outline: 2.5px solid #333333;
  }
`

const SubmitBtn = styled.button`
  font-family: Minseo;
  font-size: 1.5rem;
  margin-top: 1rem;
  background-color: #ccf3ee;
  border-radius: 1rem;
  border: 2px dashed #333333;
  color: #333333;

  &:hover {
    background-color: #aae7df;
  }
`

const EmailCheck = (props) => {
  const [codeIn, setCodeIn] = useState('')

  const sendToMain = () => {
    props.closeEmailModal(false)
  }

  const checkCode = () => {
    if (parseInt(codeIn) === props.code) {
      props.setCheckedEmail(true)
      props.closeEmailModal()
    }
  }

  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={sendToMain} />
        <h2>이메일로 전송된 인증코드를 입력하세요</h2>
        <InputHash type="text" onChange={(e) => setCodeIn(e.target.value)} />
        <SubmitBtn type="button" onClick={checkCode}>
          인증번호 확인
        </SubmitBtn>
      </ModalView>
    </ModalBackdrop>
  )
}

export default EmailCheck
