import styled from "styled-components"
import { MdLogout, MdKeyboardBackspace, MdInfoOutline } from 'react-icons/md'
import { useState, } from "react"
import { useSelector, useDispatch } from "react-redux";
import UserReportModal from "./UserReportModal";
import DeleteModal from "./DeleteModal";
import UserProfileModal from "./UserProfileModal";

const Container = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
  margin-bottom: 0.5rem;
`;

const Leave = styled(MdLogout)`
  font-size: 1.5rem;
  color: #d1b411;
`;

const Close = styled(MdKeyboardBackspace)`
  font-size: 1.5rem;
  color: #d1b411;
`

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`

const Username = styled.span`
  font-size: 1.4rem;
  background-color: #f8d71a;
  border-radius: 1rem;
  margin-right: 0.2rem;
`

const UserInform = styled(MdInfoOutline)`
  font-size: 1.5rem;
  color: #e7c500;
  margin-left: 0.2rem;
`

const ChatRoomHeader = ({chatUser, openChatList, setChatUser, openChatRoom, chatRoomNo, chatUserNo }) => {

  const {userProfilePicUrl} = useSelector((state) => state.chat)
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
          setChatUser('')
          openChatRoom()
        }}/>
        <User>
          <Username>
            {chatUser}  
          </Username>
          {/* 아 이게 아이콘이구나 */}
          <UserInform onClick={openUserProfileModal}/> 
          {isOpen ? <UserProfileModal openUserProfileModal={openUserProfileModal} oppositeUserNo={chatUserNo} /> : null}
        </User>

        <Leave onClick={openDeleteModal}/>

        {userProfilePicUrl}
       

        {isDeleteModalOpen ? <DeleteModal openDeleteModal={openDeleteModal} chatRoomNo={chatRoomNo} openChatRoom={openChatRoom}  /> : null}
        
      </Container>
    </>
  )
}

export default ChatRoomHeader