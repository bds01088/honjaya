/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'
import styled from 'styled-components'
import Message from './Message'

const ChatContainer = styled.div`
  width: 100%;
`

const MessageContainer = styled.div`
  border-top: 2px dashed #333333;
  border-bottom: 2px dashed #333333;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
`

const CommandText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  font-family: Minseo;
  margin-bottom: 0.2rem;
`

const PairUsername = styled.span`
  background-color: #ffc5c5;
  border-radius: 1rem;
  color: red;
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 0.8rem;
  font-family: Minseo;
`

const PairText = styled.span`
  font-size: 1.3rem;
  font-family: Minseo;
`

class Messages extends Component {
  render() {
    const { messages, myRole, pairUser, myName } = this.props

    return messages.map((message, i) => (
      <ChatContainer className={`messages__item ${message.chatClass}`} key={i}>
        {myRole === 2 && pairUser ? (
          message.userName === pairUser.userNickname ? (
            <MessageContainer>
              <CommandText>지시자의 메시지가 도착했습니다</CommandText>
              <PairUsername>{message.userName}(지시자) </PairUsername>
              <PairText>{message.text}</PairText>
            </MessageContainer>
          ) : (
            <Message
              text={message.text}
              userName={message.userName}
              myName={myName}
            />
          )
        ) : (
          <Message
            text={message.text}
            userName={message.userName}
            myName={myName}
          />
        )}
      </ChatContainer>
    ))
  }
}

export default Messages
