import styled from "styled-components"

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

const ChatRoom = ({chatUser}) => {
    return (
        <Container>
            {chatUser}
            채팅방입니다아아아 !!!!!!!!!!!!!
        </Container>
    )
}

export default ChatRoom