import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  margin-left: 5rem;
  /* padding-left: 5rem; */
  @media (max-width: 412px) {
    width: 100vw;
  }
`

const Logo = styled.img`
  /* position: fixed; */
  /* display: inline; */
  margin-left: 2rem;
`

const ModeHeader = () => {
  return (
    <>
      <Header>
        <Logo src={logo}></Logo>
      </Header>

    </>
  )
}

export default ModeHeader


