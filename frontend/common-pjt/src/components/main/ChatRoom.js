import styled from "styled-components"
import ChatRoomHeader from "./ChatRoomHeader"
import { MdSend } from "react-icons/md"; 

const Container = styled.div`
  width: 18rem;
  height: 30rem;
  position: absolute;
  background-color: white;
  bottom: 8rem;
  left: 5rem;
  border-radius: 2rem;
  border: 2px solid;
  padding: 1rem;

  font-family: Jua;
  font-size: 1.2rem;

  @media screen and (max-height: 800px){
    font-size: 1.5rem;
    height: 20rem;
    font-size: 1rem;
  }
`

const ChatContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  font-family: Jua;
`

const ChatRecord = styled.div`
  height: 90%;
  border: 2px solid blue; 
`

const SendBox = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SendInput = styled.input`
  height: 80%;
  width: 80%;
  padding: 0.2rem;
  font-family: Jua;
  border-radius: 0.5rem;
  border: 2.1px solid #333333;
`

const SendButton = styled.button`
  /* visibility: hidden; */
  background: none;
  border: none;
`

const SendImg = styled(MdSend)`
  font-size: 2rem;
  color: #6AA3F6;
`

const ChatRoom = ({chatUser, openChatList, setChatUser}) => {
  return (
    <Container>
      <ChatRoomHeader chatUser={chatUser} openChatList={openChatList} setChatUser={setChatUser}/>
      <ChatContainer>
        <ChatRecord>

        </ChatRecord>
        <SendBox>
          <SendInput/>
          <SendButton>
            <SendImg/>
          </SendButton>
        </SendBox>
      </ChatContainer>
    </Container>
  )
}

export default ChatRoom