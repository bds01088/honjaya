import React from 'react'
import styled from 'styled-components'
import ModeHeader from './ModeHeader'
import ModePageTop from './ModePageTop'
import ModePageBottom from './ModePageBottom'


const ModeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
`


const Mode = () => {

  return (
    <Background>
      <ModeHeader />
      <ModeContainer>
        <ModePageTop/>
        <ModePageBottom/>
      </ModeContainer>
    </Background>
  )
}

export default Mode

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  border: 1px solid;
`
