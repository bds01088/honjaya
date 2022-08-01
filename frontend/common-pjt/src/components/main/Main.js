import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'
import MainHeader from './MainHeader'
import ChatList from './ChatList'
import MainCharacter from './MainCharacter'
import CreateTag from './CreateTag'
import { MdAddCircle, MdRemoveCircle, MdLogout, MdForum, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Container = styled.div`
    background-image: url(${backImg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
`

const CharacterBox = styled.div`
    position: absolute;
    top: 38%;
    left: 43%;
    width: 17%;
    height: 17%;
`

const HashTag = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;

    &.hash1 {
        top: 23%;
        left: 43%;
    }

    &.hash2 {
        top: 60%;
        left: 62%;  
    }
    &.hash3 {
        top: 70%;
        left: 36%;
    }
`

const AddHash = styled(MdAddCircle)`

    &.hash1 {
        width: 3rem;
        height: 3rem;
        color: #71db76;
    
        &:hover {
            color: #65c56a;
        }
    }

    &.hash2 {
        width: 3.2rem;
        height: 3.2rem;
        color: #df5dbe;

        &:hover {
            color: #c954ab;
        }
    }

    &.hash3 {
        width: 3.5rem;
        height: 3.5rem;
        color: #B5EAEA;

        &:hover {
            color: #77c9c9;
        }
    }
`

const Hash01 = styled.p`
    font-family: Jua;
    font-size: 1.5rem;
    border-radius: 20%;
    background-color: #85EAEA;
    padding: 0.5rem;
`

const RemoveHash01 = styled(MdRemoveCircle)`
    width: 3rem;
    height: 3rem;
    color: #71db76;
    margin-left: 1rem;

    &:hover {
        color: #65c56a;
    }
`

const LogoutBox = styled.div`
    position: absolute;
    bottom: 3.2rem;
    left: 3rem;
    flex-direction: column;
    display: flex;
    align-items: center;
`
const Logout = styled(MdLogout)`
    font-size: 2rem;
    color: #FF728E;
`
const LogoutText = styled.p`
    font-family: Jua;
    color: #FF728E;
`

const ChatBox = styled.div`
    position: absolute;
    bottom: 4rem;
    left: 9rem;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Chat = styled(MdForum)`
    font-size: 2rem;
    color: #FF728E;
`

const ChatListUp = styled.div`
    font-size: 120%;
    font-family: Jua;
    background-color: #FFFFFF;
    width: 11rem;
    height: 3rem;
    padding: 0 1rem;
    border-radius: 1rem;
    border: 2px solid #333333;
    margin-left: 1rem;
    color: #333333;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;
`

const ClosedChat = styled(MdKeyboardArrowUp)`
`


const OpenChat = styled(MdKeyboardArrowDown)`
`

const Start = styled.div`
    position: absolute;
    bottom: 3rem;
    right: 3rem;
    text-decoration: none;
    background-color: #FFCBCB;
    font-size: 2rem;
    font-family: Jua;
    padding: 1rem 2rem;
    border-radius: 2rem;
    border: 3px solid #333333;
    
    @media screen and (max-width: 800px){
        font-size: 1.5rem;
    }
`


const Main = () => {

    const [openHash01, setOpenHash01] = useState(false)
    const [hash01, setHash01] = useState('')
    const [remove01, setRemove01] = useState(false)
    const [openChat, setOpenChat] = useState(false)

    const openModalHash01 = () => {
        setOpenHash01(!openHash01)
        setHash01(hash01)
    }

    const showRemove01 = () => {
        setRemove01(!remove01)
    }

    const openChatModal = () => {
        setOpenChat(!openChat)
    }

    return (
        <Container>
            {/* MainHeader는 nickname, point, rate_score가 필요 */}
            <MainHeader/>

            <CharacterBox>
                <MainCharacter />
            </CharacterBox>

            <HashTag className="hash1">
                { hash01==='' ? 
                    <AddHash  className="hash1" onClick={openModalHash01}/> 
                    : <Hash01 onClick={showRemove01}># {hash01}</Hash01>
                }
                { remove01 ? <RemoveHash01 onClick={() => {
                    setRemove01(!remove01)
                    setHash01('')
                }}/> : null}
                { openHash01 ? <CreateTag openModalHash01={openModalHash01} setHash01={setHash01}/> : null }
            </HashTag>

            <HashTag className="hash2">
                    <AddHash className="hash2"/>
            </HashTag>

            <HashTag className="hash3">
                <AddHash className="hash3"/>
            </HashTag>
            

            <LogoutBox>
                <Logout/>
                <LogoutText>로그아웃</LogoutText>
            </LogoutBox>
            

            <ChatBox>
                <Chat/>
                <ChatListUp onClick={openChatModal}>
                    채팅목록
                    { openChat ? 
                        <ClosedChat/> : 
                        <>
                            <OpenChat/>
                            <ChatList/>
                        </>
                    }
                </ChatListUp>
            </ChatBox>

            <Start>
                <Link to="/mode" style={{ textDecoration: 'none', color: '#333333' }}>입장하기</Link>
            </Start>

        </Container>
    )
}

export default Main