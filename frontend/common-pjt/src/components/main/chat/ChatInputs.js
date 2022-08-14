import React, { useEffect } from 'react';
import styled from "styled-components"
import { MdSend } from "react-icons/md";
// import { useEffect } from 'react';
import { ConnectWithoutContact } from '@mui/icons-material';
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

const ChatInputs = ({sendMessage, setChatMessage, chatMessage, connect}) => {

  return (
    <div>
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
      
    </div>
  );
};

export default ChatInputs;