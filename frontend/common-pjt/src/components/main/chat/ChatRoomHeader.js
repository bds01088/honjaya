import styled from "styled-components"
import { MdLogout, MdKeyboardBackspace, MdInfoOutline } from 'react-icons/md'
import { useState, } from "react"
import { useSelector, useDispatch } from "react-redux";
import UserReportModal from "./UserReportModal";
import DeleteModal from "./DeleteModal";
import UserProfileModal from "../profile/UserProfileModal";
const Container = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logout = styled(MdLogout)`
  font-size: 1.5rem;
  color: #333333;
`;

const Close = styled(MdKeyboardBackspace)`
  font-size: 1.5rem;
  color: #333333;
`

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const UserInform = styled(MdInfoOutline)`
  font-size: 1.5rem;
  color: #333333;
  margin-left: 0.2rem;
`

const ChatRoomHeader = ({chatUser, openChatList, setChatUser, openChatRoom, chatRoomNo, chatUserNo }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openUserProfileModal = () => {
    setIsOpen(!isOpen)
  }
  const openDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  return (
    <>
      
      <Container>
        <Close onClick={() => {
          openChatList()
          setChatUser('')
          openChatRoom()
          
        }}/>
        <User>
          {chatUser}
         
          {/* 아 이게 아이콘이구나 */}
          <UserInform onClick={openUserProfileModal}/> 
          {isOpen ? <UserProfileModal openUserProfileModal={openUserProfileModal} oppositeUserNo={chatUserNo} /> : null}
        </User>
        <Logout onClick={openDeleteModal}/>
        {isDeleteModalOpen ? <DeleteModal openDeleteModal={openDeleteModal} chatRoomNo={chatRoomNo} openChatRoom={openChatRoom}  /> : null}
        
      </Container><hr/>
    </>
  )
}

export default ChatRoomHeader