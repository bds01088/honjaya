import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'
import MainHeader from './MainHeader'

import MainCharacter from './MainCharacter'
import CreateTag from './hashtag/CreateTag'

import {
  MdAddCircle,
  MdRemoveCircle,
  MdLogout,
  MdForum,
  MdTextsms,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md'
import React, { useState, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getHash, delHash } from './hashtag/hashtag-slice'
import { getRate } from './hashtag/rate-slice'
import { findAllRoom } from './chat/chat-slice'

import { useSelector } from 'react-redux'
import { loadUser,logout } from '../auth/login/login-slice'
import ChatList from './chat/ChatList'
import ChatRoom from './chat/ChatRoom'
// import { ConnectedTvOutlined, NavigateBefore } from '@mui/icons-material'


const Container = styled.div`
  background-image: url(${backImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  overflow: auto;
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
  align-items: center;
  cursor: pointer;

  &.hash0 {
    top: 23%;
    left: 43%;
  }

  &.hash1 {
    top: 60%;
    left: 62%;
  }

  &.hash2 {
    top: 70%;
    left: 36%;
  }
`

const AddHash = styled(MdAddCircle)`

  &.hash0 {
    width: 3rem;
    height: 3rem;
    color: #71db76;

    &:hover {
      color: #65c56a;
    }
  }

  &.hash1 {
    width: 3.2rem;
    height: 3.2rem;
    color: #df5dbe;

    &:hover {
      color: #c954ab;
    }
  }

  &.hash2 {
    width: 3.5rem;
    height: 3.5rem;
    color: #b5eaea;

    &:hover {
      color: #77c9c9;
    }
  }
`

const Hash = styled.p`
  font-family: Minseo;
  border-radius: 1rem;
  padding: 0.5rem;
  color: #333333;
  font-weight: bold;

  &.hash0 {
    background-color: #85eaea;
    font-size: 2rem;

    &:hover {
      font-size: 2.1rem;
    }
  }

  &.hash1 {
    background-color: #D9D7F1;
    font-size: 1.9rem;

    &:hover {
      font-size: 2rem;
    }
  }

  &.hash2 {
    background-color: #ffc187;
    font-size: 1.7rem;

    &:hover {
      font-size: 1.8rem;
    }
  }
`


const RemoveHash = styled(MdRemoveCircle)`
  margin-left: 1rem;

  &.hash0 {
    width: 2.2rem;
    height: 2.2rem;
    
    color: #71db76;
    &:hover {
      color: #65c56a;
    }
  }
  
  &.hash1 {
    width: 2.3rem;
    height: 2.3rem;
    
    color: #FFE6AB;
    &:hover {
      color: #dac492;
    }
  }

  &.hash2 {
    width: 2.5rem;
    height: 2.5rem;
    
    color: #FFC4C4;
    &:hover {
      color: #dbaaaa;
    }
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
  color: #ff728e;
`
const LogoutText = styled.p`
  font-family: Minseo;
  margin: 0.5rem;
  font-size: 1.3rem;
  color: #ff728e;
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

const Chat = styled(MdTextsms)`
  /* margin-right: 1rem; */
  font-size: 1.7rem;
  color: #f796a9;

`

const FullChat = styled.div`
  position: relative;
`

const ChatListUp = styled.div`
  font-size: 1.4rem;
  font-family: Minseo;
  font-weight: 600;
  background-color: #fffff9;
  width: 13rem;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 1rem;
  /* border: 2px solid #333333; */
  color: #333333;

  display: flex;
  justify-content: space-around;
  align-items: center;

  &:hover {
    font-size: 1.5rem;
  }
`

const ClosedChat = styled(MdKeyboardArrowUp)`
  font-size: 1.5rem;
`

const OpenChat = styled(MdKeyboardArrowDown)`
  font-size: 1.5rem;
`

const Start = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  text-decoration: none;
  background-color: #F38BA0;
  font-size: 3rem;
  font-family: Minseo;
  font-weight: 500;
  padding: 0.5rem 2rem;
  border-radius: 2rem;
  border: 5px dashed #ffd2d2;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #d85a73;
    border: 5px dashed #f7b9b9;
    color: #9e9e9e;
    font-size: 3.1rem;
  }
`

const Main = () => {
  const [openHash, setOpenHash] = useState(false)  
  const [hashDel, setHashDel] = useState({
    0: false,
    1: false,
    2: false,
  })  

  const [openList, setOpenList] = useState(false)
  const [openRoom, setOpenRoom] = useState(false)

  //채팅방 개설 관련 변수
  const [chatUser, setChatUser] = useState('')
  const [chatUserNo, setChatUserNo] = useState(1)
  const [chatRoomNo, setChatRoomNo] = useState(1)
  
  const dispatch = useDispatch()
  const history = useHistory()
  
  //소유한 해시태그 userSelector로 불러오기
  const hashesOwned = useSelector((state) => state.hashtag.hashesOwned);
  console.log('해쉬', hashesOwned)


  //채팅목록 불러오기
  const chatRooms = useSelector((state) => state.chat.chatRooms)

  
    
  //main 컴포넌트가 붙기 전에 해시태그 데이터 가져오기
  useEffect(() => {
    dispatch(getHash())
      .unwrap()
      .then(() => {
        console.log("해시테그 데이터 로드 완료")
      })
      .catch((err)=> {
        console.log("해시태그로드에러", err)
        // alert('해쉬태그로드에러')
      })
  }, []) 


  //main에서 유저정보 불러오기
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err)=> {
        console.log('유저로드에러', err)
        // alert('유저로드에러')
      })
  }, [])


  //main에서 별점 정보 불러오기
  useEffect(() => {
    dispatch(getRate())
    .unwrap()
    // .then((res) => {console.log(res)})
    .catch((err) => {
      console.log("별점로드에러", err)
      // alert('별점로드에러')
    })
  }, [])


  //main에서 채팅 목록 불러오기
  useEffect(() => {
    dispatch(findAllRoom())
      .unwrap()
      .then(() => {
        console.log("채팅목록생성완료")
      })
      .catch((err)=> {
        console.log("채팅목록로드에러", err)
        // alert('해쉬태그로드에러')
      })
  }, []) 


  //로그아웃 
  function handleLogout() {
    dispatch(logout())
    .unwrap()
    .then((res) => {
      //이메일이 중복이 아닐때만 중복검사결과가 true로 바뀜 
      console.log(res)
      history.push('/')
    })
    .catch((err) => {
      if (err.status === 500) {
        history.push('/error')
      }
    })
  }


  // 해시태그 추가하는 모달 open
  const openModalHash = () => {
    setOpenHash(!openHash)
  }

  // 해시태그 삭제 아이콘 띄우기
  const showHashDel = (idx) => {
    const change = {...hashDel}
    change[idx] = !hashDel[idx]
    setHashDel(change)
  }



  const openChatList = () => {
    setOpenList(!openList)
  }

  const openChatRoom = () => {
    setOpenRoom(!openRoom)
  }


  //해시태그 삭제 메소드 길어질까봐 따로 빼놓음
  const handleDeleteHash = (hashNo, idx) => {
    console.log("왜 지금 삭제됌???")
    dispatch(delHash(hashNo))
    .then((res) => {
      console.log(res)
      dispatch(getHash())
    })
    .catch((err) => {
      console.log(err)
    })

    // 해시태그 삭제 아이콘 그대로 옮기기
    let change = {...hashDel}
    for (var i=idx; i < 2; i++) {
      change[i] = change[i+1]
    }
    change[hashesOwned.length-1] = false
    setHashDel(change)
  }

  const hashLen = `hash${hashesOwned.length}`

  return (
    
    <Container>

      {/* MainHeader는 nickname, point, rate_score가 필요 */}
      <MainHeader />
      <CharacterBox>
        <MainCharacter />
       
      </CharacterBox>

      { hashesOwned.length < 3 ? 
        <HashTag className={hashLen} onClick={openModalHash}>
          <AddHash className={hashLen} onClick={openModalHash} />
        </HashTag>
        : null }

      {hashesOwned.map((item, idx) => (
        <HashTag className={'hash'+ idx}>
          <Hash className={'hash'+ idx} onClick={() => showHashDel(idx)}># {item[1]}</Hash>
          { hashDel[idx] ? <RemoveHash className={'hash'+ idx} onClick={() => handleDeleteHash(item[0], idx)}/> : null }
        </HashTag>
      ))}
      {console.log('del', hashDel)}

      {openHash ? <CreateTag openModalHash={openModalHash} /> : null}




      <LogoutBox onClick={handleLogout}>
        <Logout />
        <LogoutText>로그아웃</LogoutText>
      </LogoutBox>

      <ChatBox>
        <FullChat className="FullChat">
          <ChatListUp onClick={() => {
            openChatList()
            setChatUser('')
            if (chatUser) {
              openChatRoom()
            }
          }}>
            <Chat />1:1 채팅목록
            {openList ? <OpenChat /> : <ClosedChat />}
          </ChatListUp>

          {openList ? (
            <ChatList
              openChatList={openChatList}
              setChatUser={setChatUser}
              setChatRoomNo={setChatRoomNo}
              setChatUserNo={setChatUserNo}
              openChatRoom={openChatRoom}
              chatRooms={chatRooms}
            />
          ) : null}
        </FullChat>
      </ChatBox>

      {chatUser ? (
        <ChatRoom
          chatUser={chatUser.user}
          openChatList={openChatList}
          setChatUser={setChatUser}
          setChatRoomNo={setChatRoomNo}
          setChatUserNo={setChatUserNo}
          openChatRoom={openChatRoom}
          chatRooms = {chatRooms}
          chatRoomNo={chatRoomNo.roomNo}
          chatUserNo={chatUserNo.userNo}
        />
      ) : null}

      <Start>
        <Link to="/mode" style={{ textDecoration: 'none', color: 'white' }}>
          입장하기
        </Link>
      </Start>
    </Container>
  )
}

export default Main
