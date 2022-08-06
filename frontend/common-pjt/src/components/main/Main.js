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
import { getHash, delHash, putHash, loadHashesOwned } from './hashtag/hashtag-slice'
import { getRate } from './hashtag/rate-slice'




import { useSelector } from 'react-redux'
import { loadUser,logout } from '../auth/login/login-slice'
import { NavigateBefore } from '@mui/icons-material'



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
    color: #b5eaea;

    &:hover {
      color: #77c9c9;
    }
  }
`

const Hash01 = styled.p`
  font-family: Jua;
  font-size: 1.5rem;
  border-radius: 20%;
  background-color: #85eaea;
  padding: 0.5rem;
`
const Hash02 = styled.p`
  font-family: Jua;
  font-size: 1.5rem;
  border-radius: 20%;
  background-color: #85eaea;
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
const RemoveHash02 = styled(MdRemoveCircle)`
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
  const [openHash01, setOpenHash01] = useState(false)
  const [openHash02, setOpenHash02] = useState(false)
  const [openHash03, setOpenHash03] = useState(false)
  
  const [hash01, setHash01] = useState('')
  const [hash02, setHash02] = useState('')
  const [hash03, setHash03] = useState('')
  const [hashNo1, setHashNo1] = useState('')
  const [hashNo2, setHashNo2] = useState('')
  const [hashNo3, setHashNo3] = useState('')
  
  const [remove01, setRemove01] = useState(false)
  const [remove02, setRemove02] = useState(false)
  const [remove03, setRemove03] = useState(false)
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
  // const [hashList, setHashList] = useState([]) 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  
  const { hashesOwned } = useSelector((state) => state.hashtag);
  
  function LoadHashes() {
      console.log(hashesOwned)
      if ( hashesOwned && hashesOwned[1][1])
      {setHash01(hashesOwned[1][1])}
      if ( hashesOwned && hashesOwned[3][1])
      {setHash02(hashesOwned[3][1])} 
      if ( hashesOwned && hashesOwned[5][1])
      {setHash03(hashesOwned[5][1])} 
      
      setHashNo1(hashesOwned[0][1]) 
      setHashNo2(hashesOwned[2][1]) 
      setHashNo3(hashesOwned[4][1]) 
    }
  
  
  
    
  //main 컴포넌트가 붙기 전에 해시태그 데이터 가져오기
  useEffect(() => {
    dispatch(getHash())
      .unwrap()
      .then(() => {
        console.log("왜안됨")
        LoadHashes()
        
        
      })
      // .catch((err)=> {alert('이게에러')})
  },[])



   

  
 

  // console.log(rows[0])
  // useEffect(() => { 
  //   if(hashesOwned !== 'undefined' && hashesOwned != null) {
  //     console.log("에러없냐")
  //   }

  // },[hashesOwned])
  // console.log(hashesOwned)
  
  // useEffect(() => {
  //   if(user?.email) setValue ('email', user?.name);
    
  // }, [user]);
  // setHash01(hashesOwned[1][1])
  // [['hashNo', 42],
  //  ['hashText', 'qqqq'],
  //  ['hashNo', 43],
  //  ['hashText', 'zzzz'],
  //  ['hashNo', 44],
  //  ['hashText', 'llll']]
  //승승이한테 물어보기


  // const { hashtagInfo } = useSelector((state) => state.hashtag);
  // if ( hashtagInfo.length !==0 ) {
  //   setHash01(hashtagInfo[0].hashText)
  //   // const hash01 = hashtagInfo[0].hashText
    
  // }

  // console.log(hashtagInfo[0].hashText)
  // console.log(hashtagInfo[0].hashText)

  // useEffect(() => {
  //   dispatch(getHash())
  //   .unwrap()
  //   .then((res) => {
  //     console.log(res.data.list)
  //     if (res.data.list.length !== 0) {
  //       setHash01(res.data.list[0])
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("----")
  //     console.log(err)
  //   })
  //   // console.log("??")
  // },[])

  // useEffect(() => {
  //   dispatch(getHash())
  //     .unwrap()
  //     .then((res) => {
  //       // console.log(res)
  //       //요청은 요청만 받아야함
  //       console.log("로드해쉬여기완료")

  //     .catch((err) => {
  //       if (err.status === 500) {
  //         // navigate('/error');
  //       }
  //     })
  // }, [])




  // useEffect(() => {
  //   dispatch(loadHashesOwned())
  //     .unwrap()
  //     .then(() => {
  //       console.log("로드해쉬완료")
  //     })
  //     .catch((err)=> {alert('에러')})
  // },[])
  // const hash01 = useSelector((state) => state.hashtag.hashtagInfo.data.list[0])
  // const { hashesOwned } = useSelector(
  //   (state) => state.hashtag
  // );




  //main에서 유저정보 불러오기
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err)=> {alert('에러')})
  },[])

  //main에서 별점 정보 불러오기
  useEffect(() => {
    dispatch(getRate())
    .unwrap()
    // .then((res) => {console.log(res)})
    .catch((err) => {alert('이게에러네')})
  },[])




  //로그아웃 
  function handleLogout() {
    dispatch(logout())
    .unwrap()
    .then((res) => {
      //이메일이 중복이 아닐때만 중복검사결과가 true로 바뀜 
      console.log(res)
      // navigate('/')
    })
    .catch((err) => {
      if (err.status === 500) {
        navigate('/error')
      }
    })
  }



  const openModalHash01 = () => {
    setOpenHash01(!openHash01)
    // setHash01(hash01)
  }

  const showRemove01 = () => {
    // console.log("혹시 지금삭제되니?")
    setRemove01(!remove01)
  }

  const openModalHash02 = () => {
    setOpenHash01(!openHash02)
    // setHash01(hash01)
  }

  const showRemove02 = () => {
    // console.log("혹시 지금삭제되니?")
    setRemove01(!remove02)
  }

  const openChatList = () => {
    setOpenList(!openList)
  }

  //해시태그 삭제 메소드 길어질까봐 따로 빼놓음
  const handleDeleteHash = (e) => {
    
    // console.log("왜 지금 삭제됌???")

    dispatch(delHash(hashesOwned[0][1]))
    .then((res) => {
      // console.log(res)
      console.log(res)
      setRemove01(!remove01)
      dispatch(loadHashesOwned())
      alert('삭제성공')
    })
    .catch((err) => {
      // console.log(err)
    })
  }

  return (
    
    <Container>

      {/* MainHeader는 nickname, point, rate_score가 필요 */}
      <MainHeader />
      {/* {hashesOwned} */}
      <CharacterBox>
        <MainCharacter />
      </CharacterBox>
      
 
      <HashTag className="hash1">
        {hash01 === '' ? (
          <AddHash className="hash1" onClick={openModalHash01} />
        ) : (
          <Hash01 onClick={showRemove01}># {hash01}</Hash01>
        )}
        {remove01 ? (
          <RemoveHash01
            onClick={handleDeleteHash}/>
        ) : null}
        {openHash01 ? (
          <CreateTag openModalHash01={openModalHash01} setHash01={setHash01} />
        ) : null}
      </HashTag>


      {/* <HashTag className="hash2">
        {hash02 === '' ? (
            <AddHash className="hash2" onClick={openModalHash02} />
          ) : (
            <Hash02 onClick={showRemove01}># {hash02}</Hash02>
          )}
          {remove02 ? (
            <RemoveHash02
              onClick={
                handleDeleteHash(hash01.hashNo)}/>
          ) : null}
          {openHash02 ? (
            <CreateTag openModalHash02={openModalHash02} setHash02={setHash02} />
          ) : null}
      </HashTag> */}

      <HashTag className="hash3">
        <AddHash className="hash3" />
      </HashTag>

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
