import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  padding: 0 0 1rem 5rem;
  @media (max-width: 412px) {
    width: 100vw;
  }
`

const LogoLink = styled(Link)`
  position: absolute;
`
const Logo = styled.img`
  margin-left: 2rem;
  height: 5.5rem;
`

const ModeHeader = () => {
  return (
    <Header>
      <LogoLink to="/main" style={{ textDecoration: 'none' }}>
        <Logo src={logo}></Logo>
      </LogoLink>
    </Header>
  )
}

export default ModeHeader
