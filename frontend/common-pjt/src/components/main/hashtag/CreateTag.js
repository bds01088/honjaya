import styled from 'styled-components'
import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { putHash } from './hashtag-slice'

export const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.37);
  z-index: 4;
  font-family: Minseo;
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: #FFFDDE;
  border-radius: 30px;
  border: 0.2rem solid #88866f;
  color: #47463c;
  position: relative;
  font-size: 1.5rem;
`

const BackIcon = styled(MdClear)`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  color: #88866f;
  cursor: pointer;
`

const Form = styled.form``

const InputHash = styled.input`
  width: 100%;
  font-family: Minseo;
  font-size: 1.3rem;
  border: 2px solid #88866f;
  color: #47463c;
  padding: 0.3rem;
`

const SubmitBtn = styled.button`
  font-family: Minseo;
  font-size: 1.3rem;
  margin-top: 1rem;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  border: 2px solid #47463c;
  color: #47463c;
  background-color: #CCF3EE;
  cursor: pointer;

  &:hover {
    background-color: #a1cfc9;
  }
`


const CreateTag = (props) => {
  const dispatch = useDispatch()
  const [tag01, setTag01] = useState('')

  const sendToMain = (e) => { 
    if (tag01.trimStart().trimEnd() !== ''){
      dispatch(putHash(tag01))
      console.log("해시태그생성후 응답")    
    }
    props.openModalHash() 
  }

  return (
    <ModalBackdrop>
      <ModalView>
        <BackIcon onClick={sendToMain} />
        <h1>해시태그를 입력하세요</h1>
        <Form>
          <InputHash type="text" onChange={(e) => setTag01(e.target.value)} />
          <SubmitBtn onClick={(e) => sendToMain(e)}
            onKeyUp={(e) => e.key==='Enter' ? sendToMain(e) : null }
          >등록</SubmitBtn>
        </Form>
      </ModalView>
    </ModalBackdrop>
  )
}




export default CreateTag
