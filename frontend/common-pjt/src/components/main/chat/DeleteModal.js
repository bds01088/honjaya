import React from 'react'
import styled from 'styled-components'
import { MdClear } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import logoImg from '../../../assets/logo.png'
import { deleteChat } from './chat-slice'

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
`
const LogoImg = styled.img`
  height: 7rem;
  margin-bottom: 1.5rem;
`

const Text = styled.div`
  width: 100%;
  color: #4a4a4a;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
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
  color: #88866f;
  cursor: pointer;
`
const StyledBtn = styled.button`
  margin-top: 1rem;
  height: 3rem;
  width: 4rem;
  background-color: #ff728e;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.3rem;
  font-family: Minseo;
  cursor: pointer;

  &:hover {
    background-color: #b8495f;
    color: #b1aeae;
  }
`

const DeleteModal = ({ openDeleteModal, chatRoomNo }) => {
  const dispatch = useDispatch()
  const sendToBack = (e) => {
    openDeleteModal()
  }

  function handleDelete(e) {
    dispatch(deleteChat(chatRoomNo))
      .unwrap()
      .then(() => {
        console.log('삭제성공')
        sendToBack()
      })
  }

  return (
    <div>
      <ModalBackdrop onClick={sendToBack}>
        <ModalView>
          <BackIcon onClick={sendToBack} />

          <div>
            <LogoImg src={logoImg} />
          </div>

          <div>
            <Text>채팅방을 나갈 시, 채팅 목록이 모두 삭제됩니다</Text>
            <Text>정말 삭제하시겠습니까?</Text>
          </div>

          <StyledBtn onClick={() => { handleDelete() }}>삭제</StyledBtn>
        </ModalView>
      </ModalBackdrop>
    </div>
  )
}

export default DeleteModal
