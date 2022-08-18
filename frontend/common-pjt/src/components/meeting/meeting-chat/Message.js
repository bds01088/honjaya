/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import styled from 'styled-components'

const MessageContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
`

const Myname = styled.span`
  background-color: #c0d3ff;
  border-radius: 1rem;
  color: #1c3879;
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 0.8rem;
  font-family: Minseo;
`

const Username = styled.span`
  background-color: #e4e9be;
  border-radius: 1rem;
  color: #446a46;
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 0.8rem;
  font-family: Minseo;
`

const Text = styled.span`
  font-size: 1.3rem;
  font-family: Minseo;
`

class Message extends Component {
  render() {
    const { text, userName, myName } = this.props

    return (
      <MessageContainer>
        {userName === myName ? (
          <Myname>{userName}(Me) </Myname>
        ) : (
          <Username>{userName}</Username>
        )}
        <Text>{text}</Text>
      </MessageContainer>
    )
  }
}

export default Message
