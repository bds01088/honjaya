import React from 'react'
import styled from 'styled-components'
import ModeHeader from './ModeHeader'
import ModeRole from './ModeRole'
import ModePersonnel from './ModePersonnel'
import ModeHetero from './ModeHetero'

const Mode = () => {

  return (
    <Background>
      <ModeHeader />
      <ModeRole />
      <ModePersonnel />
      <ModeHetero />
    </Background>
  )
}

export default Mode

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
