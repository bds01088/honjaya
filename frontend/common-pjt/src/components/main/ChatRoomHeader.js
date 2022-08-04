import styled from "styled-components"
import { MdLogout, MdKeyboardBackspace, MdInfoOutline } from 'react-icons/md'

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

const ChatRoomHeader = ({chatUser, openChatList, setChatUser}) => {
  return (
    <>
      <Container>
        <Close onClick={() => {
          openChatList()
          setChatUser('')
        }}/>
        <User>
          {chatUser} 
          <UserInform />
        </User>
        <Logout/>
        
      </Container><hr/>
    </>
  )
}

export default ChatRoomHeader