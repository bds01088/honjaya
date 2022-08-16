import React from 'react';
import styled from 'styled-components'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import logoImg from '../../../assets/logo.png'
import axios from '../../../api/http'
import { useEffect, useState } from 'react'
import { deleteChat } from './chat-slice';
import { Link, useHistory } from 'react-router-dom'

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
const LogoImg = styled.img`
  height: 5rem;
`

const Text = styled.div`
  width: 100%;
  color: #4A4A4A;
  font-size: 1rem;
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
`
const StyledBtn = styled.button`
  height: 3rem;
  background-color: #ff728e;
  color: white;
  border-radius: 0.5rem;
  border: 0;
  font-size: 1rem;
  font-family: Jua;
`


const DeleteModal = ({openDeleteModal, chatRoomNo}) => { 
  const [isDeleted, setIsDeleted] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const sendToBack = (e) => { 
   
    openDeleteModal() } 
  

  function handleDelete(e) {
    console.log(chatRoomNo)
    dispatch(deleteChat(chatRoomNo))
    .unwrap()
    .then(() => {
      console.log("삭제성공")
      sendToBack()
    
     
    })
  }

  
  return (
    <div>
    <ModalBackdrop>
      <ModalView> 
        <BackIcon onClick={
          sendToBack}/>
             
            <div>
              <LogoImg src={logoImg} />
            </div>  
   
            <div>
              <Text>채팅방을 나갈 시, 채팅 목록이 모두 삭제됩니다</Text>
              <Text>정말 삭제하시겠습니까?</Text>
            </div>


          <StyledBtn onClick={() => {handleDelete()}}>삭제</StyledBtn>
      
        </ModalView>
      </ModalBackdrop>
  </div>
  );
};

export default DeleteModal;