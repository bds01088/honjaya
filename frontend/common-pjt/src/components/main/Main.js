import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'
import MainHeader from './MainHeader'
import ChatList from './ChatList'
import MainCharacter from './MainCharacter'
import CreateTag from './hashtag/CreateTag'
import ChatRoom from './ChatRoom'
import {
  MdAddCircle,
  MdRemoveCircle,
  MdLogout,
  MdForum,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md'
import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getHash, delHash, putHash } from './hashtag/hashtag-slice'
import { getRate } from './hashtag/rate-slice'


import { useSelector } from 'react-redux'
import { loadUser,logout } from '../auth/login/login-slice'
import { ConnectedTvOutlined, NavigateBefore } from '@mui/icons-material'
import HashDeleteModal from './HashDeleteModal'



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
  font-family: Jua;
  border-radius: 20%;
  padding: 0.5rem;

  &.hash0 {
    background-color: #85eaea;
    font-size: 1.4rem;
  }

  &.hash1 {
    background-color: #D9D7F1;
    font-size: 1.3rem;
  }

  &.hash2 {
    background-color: #ffc187;
    font-size: 1.5rem;
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
  font-family: Jua;
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

const Chat = styled(MdForum)`
  margin-right: 1rem;
  font-size: 2rem;
  color: #ff728e;
`

const FullChat = styled.div`
  position: relative;
`

const ChatListUp = styled.div`
  font-size: 120%;
  font-family: Jua;
  background-color: #ffffff;
  width: 11rem;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 1rem;
  border: 2px solid #333333;
  color: #333333;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ClosedChat = styled(MdKeyboardArrowUp)``

const OpenChat = styled(MdKeyboardArrowDown)``

const Start = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  text-decoration: none;
  background-color: #ffcbcb;
  font-size: 2rem;
  font-family: Jua;
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: 3px solid #333333;

  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
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
  
  const [users, setUsers] = useState([
    '김누리',
    '김효근',
    '배상현',
    '배송윤',
    '이승현',
    '박준영',
    '구두성',
    '강태찬',
  ])

  const [chatUser, setChatUser] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  //소유한 해시태그 userSelector로 불러오기
  const hashesOwned = useSelector((state) => state.hashtag.hashesOwned);
  console.log('해쉬', hashesOwned)


  // 차라리 컴포넌트 단에서
  // hashesOwned.map(<div></div>)  

  
    
  //main 컴포넌트가 붙기 전에 해시태그 데이터 가져오기
  useEffect(() => {
    dispatch(getHash())
      .unwrap()
      .then(() => {
        console.log("해시테그 데이터 로드 완료")
      })
      .catch((err)=> {alert('해쉬태그로드에러')})
  }, []) 


  //main에서 유저정보 불러오기
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err)=> {alert('유저로드에러')})
  }, [])


  //main에서 별점 정보 불러오기
  useEffect(() => {
    dispatch(getRate())
    .unwrap()
    // .then((res) => {console.log(res)})
    .catch((err) => {alert('별점로드에러')})
  }, [])


  //로그아웃 
  function handleLogout() {
    dispatch(logout())
    .unwrap()
    .then((res) => {
      //이메일이 중복이 아닐때만 중복검사결과가 true로 바뀜 
      console.log(res)
      navigate('/')
    })
    .catch((err) => {
      if (err.status === 500) {
        navigate('/error')
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
  
  console.log('hashDel', hashDel)


  const openChatList = () => {
    setOpenList(!openList)
  }

  const [isOpen, setIsOpen] = useState(false)
  const openHashDeleteModal = () => {
    setIsOpen(!isOpen)
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
    change = change.splice(0, 1)
    change[hashesOwned.length] = !hashDel[false]
    setHashDel(change)
  }

  const hashLen = `hash${hashesOwned.length}`

  return (
    
    <Container>

      {/* MainHeader는 nickname, point, rate_score가 필요 */}
      <MainHeader />
      <CharacterBox>
        <MainCharacter />
        {isOpen ? <HashDeleteModal openHashDeleteModal={openHashDeleteModal} /> : null}
      </CharacterBox>


      <HashTag className={hashLen} onClick={openModalHash}>
        <AddHash className={hashLen} onClick={openModalHash} />
      </HashTag>

      {hashesOwned.map((item, idx) => (
        <HashTag className={'hash'+ idx}>
          <Hash className={'hash'+ idx} onClick={() => showHashDel(idx)}># {item[1]}</Hash>
          { hashDel[idx] ? <RemoveHash className={'hash'+ idx} onClick={() => handleDeleteHash(item[0], idx)}/> : null }
        </HashTag>
      ))}

      {openHash ? <CreateTag openModalHash={openModalHash} /> : null}




      <LogoutBox onClick={handleLogout}>
        <Logout />
        <LogoutText>로그아웃</LogoutText>
      </LogoutBox>

      <ChatBox>
        <Chat />
        <FullChat className="FullChat">
          <ChatListUp onClick={openChatList}>
            
            채팅목록
            {openList ? <OpenChat /> : <ClosedChat />}
          </ChatListUp>

          {openList ? (
            <ChatList
              openChatList={openChatList}
              users={users}
              setChatUser={setChatUser}
            />
          ) : null}
        </FullChat>
      </ChatBox>

      {chatUser ? (
        <ChatRoom
          chatUser={chatUser.user}
          openChatList={openChatList}
          setChatUser={setChatUser}
        />
      ) : null}

      <Start>
        <Link to="/mode" style={{ textDecoration: 'none', color: '#333333' }}>
          입장하기
        </Link>
      </Start>
    </Container>
  )
}

export default Main
