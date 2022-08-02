import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
// import ModeChoice from "./ModeChoice"

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7rem;

  @media (max-width: 412px) {
    width: 100vw;
  }
`

const Logo = styled.img`
  /* position: fixed; */
  /* display: inline; */
  margin-left: 2rem;
`

const ModeSelect = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Jua';
  font-size: 2rem;
`

const Text = styled.p`
  position: relative;
  top: 1rem;
  z-index: 1;
  padding: 0 2rem;
  font-size: 2rem;
  background-color: #fffdde;
  font-family: 'Jua';
`

const ModeHeader = () => {
  return (
    <>
      <Header>
        <Logo src={logo}></Logo>
      </Header>

      <ModeSelect>
        <Text>역할선택</Text>
      </ModeSelect>
    </>
  )
}

export default ModeHeader
