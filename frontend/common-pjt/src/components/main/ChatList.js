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

const ChatList = ({users, openChatList, setChatUser, openChatRoom}) => {

  return (
    <Container>
      {users.map(user => (
        <>
          <ChatListItem openChatList={openChatList} user={user} setChatUser={setChatUser} openChatRoom={openChatRoom}/><hr/>
        </>
      ))}
    </Container>
  )
}
export default ChatList