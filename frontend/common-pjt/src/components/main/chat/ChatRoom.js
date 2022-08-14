import styled from "styled-components"
import ChatRoomHeader from "./ChatRoomHeader"
import { MdSend } from "react-icons/md"; 
import { useEffect } from "react";
import { enterRoom } from "./chat-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getChatRoomDetail } from "./chat-slice";
import ScrollToBottom from "react-scroll-to-bottom";
import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

// import { randomColor } from './utils/common';

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

const ChatContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  font-family: Jua;
`

const ChatRecord = styled.div`
  height: 90%;
  border: 2px solid blue; 
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
  font-family: Jua;
  border-radius: 0.5rem;
  border: 2.1px solid #333333;
`

const SendButton = styled.button`
  /* visibility: hidden; */
  background: none;
  border: none;
`

const SendImg = styled(MdSend)`
  font-size: 2rem;
  color: #6AA3F6;
`

//여기서 통신을 해야하나
//chatUser는 상대 유저


const ChatRoom = ({chatUser, chatUserNo, chatRoomNo, openChatList, setChatUser, openChatRoom, chatRooms}) => {

const myUserNo = useSelector((state) => state.chat.myUserNo)
const opponentUserNo = useSelector((state) => state.chat.opponentUserNo)
const opponentUserNickname = useSelector((state) => state.chat.opponentUserNickname)
const dispatch = useDispatch()



// const [chatRoomNo,setChatRoomNo] = useState(1)
// const [opponentNo,setOpponentNo] = useState(1)
// const [opponentNickname,setOpponentNickname] =useState('')
// const [userNo, setUserNo] = useState(1)
const [chatMessage, setChatMessage] = useState("")
const [messages, setMessages] = useState([])


const Stomp = require("stompjs");
var SockJS = require("sockjs-client");
const sockJs = new SockJS("https://i7e104.p.ssafy.io/honjaya/stomp/chat");
var stomp = Stomp.over(sockJs);
var reconnect = 0;





function sendMessage() {
  stomp.send(
    "/pub/chat/message",
    {},
    JSON.stringify({
      chatroomNo: `${chatRoomNo}`,
      userNo: `${myUserNo}`,
      chatMessage: chatMessage,
    })
    )
    setChatMessage("")
    
}


function recvMessage(recv) {
  messages.unshift({
    userNo: recv.userNo,
    userNickname: recv.userNickname,
    chatMessage: recv.chatMessage,
    chatTime: recv.chatTime,
  })
}

function connect() {
  // pub/sub event

  stomp.connect(
    {},
    function (frame) {
      console.log("방번호",chatRoomNo);
      
      stomp.subscribe(`/sub/chat/room/${chatRoomNo}` , function (message) {
        var recv = JSON.parse(message.body);
        recvMessage(recv);
      })
      stomp.send(
        "/pub/chat/enter",
        {},
        JSON.stringify({
          chatroomNo: `${chatRoomNo}`,
          userNo: `${myUserNo}`,
        })
        );
        console.log("구독 성공");
    },
    function (error) {
      if (reconnect++ <= 5) {
        setTimeout(function () {
          console.log("connection reconnect");
          stomp = Stomp.over(sockJs);
          connect();
        }, 10 * 1000);
      }
    }
    );
}


useEffect(() => {
  dispatch(enterRoom(chatRoomNo))
    .unwrap()
    .then((res) => {
      console.log("채팅방입장성공", res.data)
      dispatch(getChatRoomDetail(chatRoomNo))
        .unwrap()
        .then((res) => { console.log("방정보 불러오기 성공")
            connect()
          
        })
        .catch((err) => {
          alert("방 정보 불러오기 실패")
        })
        
    })
    .catch((err) => {
      console.log('채팅방입장에러', err)
    })
},[])




return (
  <div>
      {openChatRoom ? (
        <Container>
            {chatUser}
            {chatRoomNo}
            {chatUserNo}
            {myUserNo}

            {/* {chatUserNo} */}
            <ChatRoomHeader chatUser={chatUser} openChatList={openChatList} setChatUser={setChatUser} openChatRoom={openChatRoom}/>
            <ChatContainer>
              <ChatRecord>
  
                <ScrollToBottom >
                  <ul>
                    {messages.map((msg) => (
                      <li>
                        <p>{msg.chatTime}</p>
                        <p>{msg.chatMessage}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollToBottom>
              
         
              </ChatRecord>
              <SendBox>
                <SendInput
                  name="user_input"
                  size="large"
                  placeholder="Write your message..."
                  value={chatMessage}
                  onChange={(event) => setChatMessage(event.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      sendMessage(chatMessage);
                      setChatMessage("");
                    }
                  }}

                />
                <SendButton
                  onClick={() => {
                    sendMessage(chatMessage);
                    setChatMessage("")}}
                >
                  <SendImg/>
                </SendButton>
              </SendBox>
            </ChatContainer>
          </Container>
  
        ) : null}
    </div>




    ) 
  }


export default ChatRoom