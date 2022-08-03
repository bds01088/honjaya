import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;

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
        {/* <ModeSelect>
          <Text>역할선택</Text>
        </ModeSelect> */}
      </Header>

    </>
  )
}

export default ModeHeader


