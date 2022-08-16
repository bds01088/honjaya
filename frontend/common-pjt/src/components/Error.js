import React from "react";
import backImg from './../assets/base.PNG'
import logo from './../assets/logo.png'
import bear from './../assets/random.png'
import styled from 'styled-components'

const Background = styled.div`
background-image: url(${backImg});
background-size: cover;
background-color: #fffdde;
width: 100vw;
height: 100vh;
`
const Header = styled.div`
  display: flex;
  height: 10%;
  padding: 0 0 1rem 5rem;
`

const Logo = styled.img`
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80%;
`
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  height: 40%;
`

const Img = styled.img`
  height: 100%;
`

const H1 = styled.h1`
`

const H3 = styled.h3`
`

const Error = () => {
  return (

    <Background>

      <Header>
        <Logo src={logo}></Logo>
      </Header>

      <Container>
        <ImgDiv>
          <Img src={bear}></Img>
        </ImgDiv>
          <H1>404 </H1>
          <H3>띠요용...페이지 낫 파운드 입니다요.</H3>
      </Container>
    </Background>
  )
}

export default Error