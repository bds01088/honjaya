import styled from "styled-components"
import ChatRoomHeader from "./ChatRoomHeader"
import { MdSend } from "react-icons/md"; 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useState } from 'react';

import SockJS from "sockjs-client";
import Stomp from 'stompjs';


import { enterRoom, getChatRoomDetail } from "./chat-slice";



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



const ChatRoom = ({chatUser, chatUserNo, chatRoomNo, openChatList, setChatUser, openChatRoom, chatRooms}) => {

const myUserNo = useSelector((state) => state.chat.myUserNo)
const opponentUserNo = useSelector((state) => state.chat.opponentUserNo)
const opponentUserNickname = useSelector((state) => state.chat.opponentUserNickname)
const dispatch = useDispatch()


const [chatMessage, setChatMessage] = useState(" ")
const [messages, setMessages] = useState([])


var sockJs = new SockJS("https://i7e104.p.ssafy.io/honjaya/stomp/chat");
var stomp = Stomp.over(sockJs);
var reconnect = 0;


const sendMessage= () => {
  stomp.send(
    "/pub/chat/message",
    {},
    JSON.stringify({
      chatroomNo: `${chatRoomNo}`,
      userNo: `${myUserNo}`,
      chatMessage: chatMessage,
    })
    )
}


const recvMessage = (recv) => {
  messages.push({
    userNo: recv.userNo,
    userNickname: recv.userNickname,
    chatMessage: recv.chatMessage,
    chatTime: recv.chatTime,
  })
  setMessages(messages)


  //바뀐 값 인식 못할때 새로운 배열을 만들어서 구조분해할당후 수정해주기 이부분 주석은 남겨줘!
  // const temp = {
  //   userNo: recv.userNo,
  //   userNickname: recv.userNickname,
  //   chatMessage: recv.chatMessage,
  //   chatTime: recv.chatTime,
  // }

  // const tempArray = [temp,...messages]
  // setMessages(tempArray)
  // setMessages(messages)

}


const connect = () => {
  stomp.connect(
    {},
    function (frame) {
      console.log("방번호",chatRoomNo);
      
      stomp.subscribe(`/sub/chat/room/${chatRoomNo}` , function (message) {
        var recv = JSON.parse(message.body);
        //이게 내 메시지인지 아닌지 비교할려면 여기담긴 상대 userNo 이랑 내가 컴포넌트에 myUserNo 쓸수있게 해놔서 그거 비교하면 될듯!
        console.log("여기에 받아오는 정보 다 있음 확인해서 사용하면됨", recv)
        // setIsRecived(true)
        recvMessage(recv)
        //시간 차 사용해서 재랜더링 강제로 일으키기
        setTimeout(() => {
          setChatMessage("")
          
        }, 200);
      //상대방 대화도 업데이트 필요함
      setChatMessage(" ")      
      })
      stomp.send(
        "/pub/chat/enter",
        {},
        JSON.stringify({
          chatroomNo: `${chatRoomNo}`,
          userNo: `${myUserNo}`,
        })
        )
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
  }
)



return (
  <div>
      {openChatRoom ? (
        <Container>

            <ChatRoomHeader chatUser={chatUser} openChatList={openChatList} setChatUser={setChatUser} openChatRoom={openChatRoom}/>
            <ChatContainer>
              <ChatRecord>
                  <ul>
                    {messages.map((msg, idx) => (
                      <li key={idx}>
                        <p>{msg.chatTime}</p>
                        <p>{msg.chatMessage}</p>
                      </li>
                    ))}
                  </ul>  
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
                     
                      ;
                    }
                  }}

                />
                <SendButton
                  onClick={() => {
                    sendMessage(chatMessage);
                    
                  }}
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