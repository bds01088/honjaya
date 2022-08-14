import styled from "styled-components"
import ChatListItem from "./ChatListItem"

const Container = styled.div`
  position: absolute;
  font-size: 120%;
  font-family: Jua;
  background-color: #FFFFFF;
  width: 13rem;
  height: 20rem;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid #333333;
  bottom: 3.2rem;
  left: 0rem;
  overflow-y: scroll;
  z-index: 1;

  &::-webkit-scrollbar{
    width: 0.7rem;
  }

  &::-webkit-scrollbar-thumb{
    height: 15%;
    background-color: #333333;
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-track{
    background-color: #cccccc;
    border-radius: 2rem;
    }
`

const ChatList = ({ openChatList, setChatUser, openChatRoom, chatRooms, setChatRoomNo, setChatUserNo}) => {

  //채팅상대유저
  const users = chatRooms.map((chatRoom ) => ( chatRoom.userNickname )
  )
  const chatRoomNos = chatRooms.map((chatRoom) => (chatRoom.chatroomNo))
  const chatUserNos = chatRooms.map((chatRoom) => (chatRoom.userNo))
  return (
    <Container>
   
      {chatRooms.map((chatRoom) => (
        <>
          <ChatListItem openChatList={openChatList} user={chatRoom.userNickname} roomNo={chatRoom.chatroomNo} setChatUser={setChatUser} setChatRoomNo={setChatRoomNo} userNo={chatRoom.userNo} setChatUserNo={setChatUserNo} openChatRoom={openChatRoom}  /><hr/>
        </>
      ))}
    </Container>
  )
}
export default ChatList