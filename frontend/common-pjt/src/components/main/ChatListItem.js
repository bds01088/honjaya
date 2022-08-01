import styled from "styled-components"
import { MdClose } from "react-icons/md"

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Name = styled.p`
    font-size: 1.3rem;
`

const ChatListItem = ({user}) => {
    return (
        <Container className="Container">
            <Name>{user}</Name>
            <MdClose/>
        </Container>
    )
}

export default ChatListItem