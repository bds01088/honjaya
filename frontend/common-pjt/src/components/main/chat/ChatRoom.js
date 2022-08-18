import styled from 'styled-components'
import ChatRoomHeader from './ChatRoomHeader'
import { MdSend } from 'react-icons/md'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { enterRoom, getChatRoomDetail } from './chat-slice'

const Container = styled.div`
  width: 18rem;
  height: 30rem;
  position: absolute;
  background-color: #fffff9;
  bottom: 8rem;
  left: 5rem;
  border-radius: 2rem;
  border: 2px solid #f7d40d;
  padding: 1rem;

  font-family: Minseo;
  font-size: 1.4rem;

  @media screen and (max-height: 800px) {
    font-size: 1.5rem;
    height: 23rem;
    font-size: 1rem;
  }
`

const ChatContainer = styled.div`
  padding: 0.3rem;
  height: 90%;
  display: flex;
  flex-direction: column;
  font-family: Minseo;
`

const ChatRecord = styled.div`
  height: 90%;
  overflow-x: auto;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: #f5d312;
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #f8edb1;
    border-radius: 2rem;
  }
`

const SendBox = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SendInput = styled.input`
  height: 80%;
  width: 80%;
  padding: 0.2rem;
  font-family: Minseo;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  border: 2.1px solid #f5d41c;

  &:hover {
    border: 2.5px solid #c7aa06;
  }

  &:focus {
    outline: 0;
    border: 2.5px solid #c7aa06;
  }
`

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

const SendImg = styled(MdSend)`
  font-size: 2rem;
  color: #f5d41c;

  &:hover {
    color: #c7aa06;
  }
`

const You = styled.div`
  display: flex;
  height: 25%;
  width: 100%;
  flex-direction: column;
  display: inline-block;
`
const Me = styled.div`
  display: flex;
  height: 25%;
  flex-direction: column;
  text-align: right;
`
const YourNickname = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
`
const Yourname = styled.div`
  background-color: #ace248;
  border-radius: 1rem;
`

const MyNickname = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 1.2rem;
`

const Myname = styled.div`
  background-color: #dbefb7;
  border-radius: 1rem;
`

const Text = styled.div`
  margin: 0.1rem 0.5rem;
  display: inline-block;
  font-family: Minseo;
`

const SendTime = styled.div`
  color: #333333;
  margin: 0 0.5rem;
  font-size: 0.8rem;
`

const ChatRoom = ({
  chatUser,
  chatUserNo,
  chatRoomNo,
  openChatList,
  setChatUser,
  openChatRoom,
  chatRooms,
}) => {
  const myUserNo = useSelector((state) => state.chat.myUserNo)

  const dispatch = useDispatch()

  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isUpdated, setIsUpdated] = useState(' ')

  var sockJs = new SockJS('https://i7e104.p.ssafy.io/honjaya/stomp/chat')
  var stomp = Stomp.over(sockJs)
  var reconnect = 0

  // 메시지 발신
  const sendMessage = () => {
    if (chatMessage.trim() === '') return
    stomp.send(
      '/pub/chat/message',
      {},
      JSON.stringify({
        chatroomNo: `${chatRoomNo}`,
        userNo: `${myUserNo}`,
        chatMessage: chatMessage,
      }),
    )
  }

  // 메시지 수신
  const recvMessage = (recv) => {
    messages.push({
      userNo: recv.userNo,
      userNickname: recv.userNickname,
      chatMessage: recv.chatMessage,
      chatTime: recv.chatTime,
    })
    setMessages(messages)
  }

  const connect = () => {
    stomp.connect(
      {},
      function (frame) {
        console.log('방번호', chatRoomNo)

        stomp.subscribe(`/sub/chat/room/${chatRoomNo}`, function (message) {
          var recv = JSON.parse(message.body)
          recvMessage(recv)

          //시간 차 사용해서 재랜더링 강제로 일으키기
          setTimeout(() => {
            setIsUpdated('')
          }, 200)

          // 상대방 메시지 불러오기
          setIsUpdated(' ')
        })
        stomp.send(
          '/pub/chat/enter',
          {},
          JSON.stringify({
            chatroomNo: `${chatRoomNo}`,
            userNo: `${myUserNo}`,
          }),
        )
      },
      function (error) {
        if (reconnect++ <= 5) {
          setTimeout(function () {
            console.log('connection reconnect')
            stomp = Stomp.over(sockJs)
            connect()
          }, 10 * 1000)
        }
      },
    )
  }

  useEffect(() => {
    dispatch(enterRoom(chatRoomNo))
      .unwrap()
      .then((res) => {
        dispatch(getChatRoomDetail(chatRoomNo))
          .unwrap()
          .then((res) => {
            connect()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <div>
      {openChatRoom ? (
        <Container>
          <ChatRoomHeader
            chatUser={chatUser}
            openChatList={openChatList}
            setChatUser={setChatUser}
            openChatRoom={openChatRoom}
            chatRoomNo={chatRoomNo}
            chatUserNo={chatUserNo}
          />
          <ChatContainer>
            <ChatRecord>
              {messages.map((msg, idx) => {
                return (
                  <>
                    {msg.userNo !== myUserNo ? (
                      // 상대 메시지는 왼쪽에
                      <You key={idx} {...msg}>
                        <YourNickname>
                          <Yourname>{msg.userNickname}</Yourname>
                          <SendTime>({msg.chatTime})</SendTime>
                        </YourNickname>
                        <Text>{msg.chatMessage}</Text>
                      </You>
                    ) : (
                      // 내 메시지는 오른쪽에
                      <Me key={idx} {...msg}>
                        <MyNickname>
                          <Myname>{msg.userNickname}</Myname>
                          <SendTime>({msg.chatTime})</SendTime>
                        </MyNickname>
                        <Text>{msg.chatMessage}</Text>
                      </Me>
                    )}
                  </>
                )
              })}
              <div ref={scrollRef} />
            </ChatRecord>

            <SendBox>
              <SendInput
                name="user_input"
                size="large"
                placeholder="메시지를 입력하세요"
                value={chatMessage}
                onChange={(event) => setChatMessage(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    sendMessage(chatMessage)
                    setChatMessage('')
                  }
                }}
              />
              <SendButton
                onClick={() => {
                  sendMessage(chatMessage)
                  setChatMessage('')
                }}
              >
                <SendImg />
              </SendButton>
            </SendBox>
          </ChatContainer>
        </Container>
      ) : null}
    </div>
  )
}

export default ChatRoom
