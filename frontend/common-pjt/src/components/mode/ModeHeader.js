import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Header = styled.div`
  height: 10%;
  padding: 0 0 1rem 5rem;
  @media (max-width: 412px) {
    width: 100vw;
  }
`


const LogoBox = styled.div`
  height: 100%;
`

const Logo = styled.img`
  margin-left: 2rem;
  height: 110%;
`

const ModeHeader = () => {
  return (
    <Header>
      <Link to="/main" style={{ textDecoration: 'none' }}>
        <LogoBox>
          <Logo src={logo}></Logo>
        </LogoBox>
      </Link>
    </Header>
  )
}

export default ModeHeader
