import styled from 'styled-components'
import { MdLogout, MdKeyboardBackspace, MdInfoOutline } from 'react-icons/md'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteModal from './DeleteModal'
import UserProfileModal from './UserProfileModal'

const Container = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
  margin-bottom: 0.5rem;
`

const Leave = styled(MdLogout)`
  font-size: 1.5rem;
  color: #d1b411;
  cursor: pointer;
`

const Close = styled(MdKeyboardBackspace)`
  font-size: 1.5rem;
  color: #d1b411;
  cursor: pointer;
`

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CharacterBox = styled.div`
  height: 100%;
`

const Character = styled.img`
  height: 2.3rem;
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
  cursor: pointer;
`

const ChatRoomHeader = ({
  chatUser,
  openChatList,
  setChatUser,
  openChatRoom,
  chatRoomNo,
  chatUserNo,
}) => {
  const { userProfilePicUrl } = useSelector((state) => state.chat)
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
          { userProfilePicUrl !== undefined ? 
            <CharacterBox><Character src={require(`../../../assets/profile_img${userProfilePicUrl}`)}/></CharacterBox> : null
          }
          <Username>{chatUser}</Username>
          <UserInform onClick={openUserProfileModal} />
          {isOpen ? (
            <UserProfileModal
              openUserProfileModal={openUserProfileModal}
              oppositeUserNo={chatUserNo}
              userProfilePicUrl={userProfilePicUrl}
            />
          ) : null}
        </User>

        <Leave onClick={openDeleteModal} />

        {isDeleteModalOpen ? (
          <DeleteModal
            openDeleteModal={openDeleteModal}
            chatRoomNo={chatRoomNo}
            openChatRoom={openChatRoom}
          />
        ) : null}
      </Container>
    </>
  )
}

export default ChatRoomHeader
