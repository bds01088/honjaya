import React from 'react'
import styled from 'styled-components'
import ModeHeader from './ModeHeader'
import ModePageTop from './ModePageTop'
import ModePageBottom from './ModePageBottom'

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`

const ModeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
`

// 모드 default = [Solo, 1:1, 성별무관]
const Mode = () => {

  return (
    <Background>
      <ModeHeader />
      <ModeContainer>

        {/* 역할 선택 */}
        <ModePageTop/> 

        {/* 인원, 성별 선택 */}
        <ModePageBottom/> 
      </ModeContainer>
    </Background>
  )
}

export default Mode


