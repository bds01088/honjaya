import { useEffect } from 'react'
import styled from 'styled-components'
import ChatListItem from './ChatListItem'
import { findAllRoom } from './chat-slice'
import { useDispatch } from 'react-redux'

const Container = styled.div`
  position: absolute;
  background-color: #fffff9;
  width: 13rem;
  height: 20rem;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  bottom: 3.2rem;
  left: 0rem;
  overflow-y: scroll;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: #f39db0;
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #fcdfe5;
    opacity: 80%;
    border-radius: 2rem;
  }
`

const ChatTitle = styled.div`
  font-size: 1.8rem;
  font-family: Minseo;
  margin-bottom: 0.5rem;
  background-color: #f3b0be;
  width: fit-content;
  border-radius: 1rem;
`

const ChatList = ({
  openChatList,
  setChatUser,
  openChatRoom,
  chatRooms,
  setChatRoomNo,
  setChatUserNo,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findAllRoom())
      .unwrap()
      .then(() => { console.log('채팅목록조회') })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Container>
      <ChatTitle>채팅목록</ChatTitle>
      {chatRooms.map((chatRoom) => {
        return (
          <ChatListItem
            openChatList={openChatList}
            user={chatRoom.userNickname}
            roomNo={chatRoom.chatroomNo}
            setChatUser={setChatUser}
            setChatRoomNo={setChatRoomNo}
            userNo={chatRoom.userNo}
            setChatUserNo={setChatUserNo}
            openChatRoom={openChatRoom}
          />
        )
      })}
    </Container>
  )
}
export default ChatList
