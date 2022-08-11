/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import styled from 'styled-components';


const MessageContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
`;

const Username = styled.span`
  color: #42387a;
  font-size: 1.3rem;
  font-weight: 600;
  margin-right: 0.8rem;
  font-family: Minseo;
`;

const Text = styled.span`
  font-size: 1.2rem;
  font-family: Minseo;
`;

class Message extends Component {
  render() {
    const { text, userName } = this.props;

    return (
      <MessageContainer>
        <Username>{userName} :</Username>
        <Text>{text}</Text>
      </MessageContainer>
    );
  }
}

export default Message;
