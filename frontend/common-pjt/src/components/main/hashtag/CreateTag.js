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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  font-family: Jua;
`

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  text-align: center;
  text-decoration: none;
  padding: 30px 90px;
  background-color: white;
  border-radius: 30px;
  color: #333333;
  position: relative;
`

const BackIcon = styled(MdClear)`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
`

const Form = styled.form``
const InputHash = styled.input`
  width: 100%;
  font-family: Jua;
  font-size: 1.5rem;
`

const SubmitBtn = styled.button`
  font-family: Jua;
  font-size: 1rem;
  margin-top: 1rem;
`


const CreateTag = (props) => {
  const dispatch = useDispatch()
  const [tag01, setTag01] = useState('')

  const sendToMain = (e) => { 

    if (tag01.trimStart().trimEnd() !== ''){
      dispatch(putHash(tag01))
      console.log("해시태그생성후 응답")    
      props.openModalHash(false) 
    }
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
