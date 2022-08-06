import styled from 'styled-components'
import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getHash, delHash, putHash, loadHashesOwned } from './hashtag/hashtag-slice'
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



const HashDeleteModal = ({openHashDeleteModal}) => {
  const dispatch = useDispatch()
  const { hashesOwned } = useSelector((state) => state.hashtag);
  const handleDeleteHash = (e) => {
      
    // console.log("왜 지금 삭제됌???")
  
    dispatch(delHash(hashesOwned[0][1]))
    .then((res) => {
      // console.log(res)
      console.log(res)
      // setRemove01(!remove01)
      
      
  
    })
    .catch((err) => {
      // console.log(err)
    })
  }
  const closeHashDeleteModal = () => {
    openHashDeleteModal(false)
}
  return (
    <ModalBackdrop onClick={closeHashDeleteModal}>
    <ModalView>
      <h1>정말 삭제하시겠습니까?</h1>
      <button onClick={handleDeleteHash}>삭제</button>
    </ModalView>
  </ModalBackdrop>
  );
};

export default HashDeleteModal;