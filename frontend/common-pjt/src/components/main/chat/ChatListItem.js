import styled from "styled-components"


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Name = styled.p`
  font-size: 1.2rem;
`

const ChatListItem = ({user , openChatList, setChatRoomNo, setChatUser, userNo, roomNo, setChatUserNo,  }) => {


  return (
    <>
      <Container onClick={() => {
        openChatList()
        setChatUser({user})
        setChatUserNo({userNo})
        setChatRoomNo({roomNo})
      }}>
        <Name>{user}</Name>
      
      </Container>
    </>
  )
}

export default ChatListItem