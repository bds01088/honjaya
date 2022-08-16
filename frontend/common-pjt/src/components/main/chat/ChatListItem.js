import styled from "styled-components"


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  font-size: 1.3rem;
  font-family: Minseo;
  border-bottom: 2px solid #333333;
  padding: 0.4rem 0;

  &:hover {
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
  }
`

const Name = styled.p`
  &:hover {
    background-color: #f8d71a;
    border-radius: 1rem;
  }
`

const ChatListItem = ({ user , openChatList, setChatRoomNo, setChatUser, userNo, roomNo, setChatUserNo,  }) => {


  return (
      <Container onClick={() => {
        openChatList()
        setChatUser({user})
        setChatUserNo({userNo})
        setChatRoomNo({roomNo})
      }}>
        <Name>{user}</Name>
      
      </Container>
  )
}

export default ChatListItem