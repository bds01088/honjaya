import styled from "styled-components"
import ChatListItem from "./ChatListItem"

const Container = styled.div`
    position: absolute;
    font-size: 120%;
    font-family: Jua;
    background-color: #FFFFFF;
    width: 11rem;
    height: 30rem;
    padding: 1rem 1rem;
    border-radius: 0.5rem;
    border: 2px solid #333333;
    bottom: 3rem;
    left: 0rem;
    overflow-y: scroll;

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

const ChatList = () => {
    const users = ['김누리', '김효근', '배상현', '배송윤', '이승현']

    return (
        <Container>
            {users.map(user => (
                <>
                    <ChatListItem user={user}/><hr/>
                </>
            ))}
        </Container>
    )
}
export default ChatList