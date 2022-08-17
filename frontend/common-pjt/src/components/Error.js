import React from 'react'
import backImg from './../assets/base.PNG'
import logo from './../assets/logo.png'
import bear from './../assets/random.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { TbError404 } from 'react-icons/tb'
import cat from './../assets/solo.png'

const Background = styled.div`
  background-image: url(${backImg});
  background-size: cover;
  width: 100vw;
  height: 100vh;
`
const Header = styled.div`
  display: flex;
  height: 13%;
  padding: 0 0 1rem 5rem;
`

const Logo = styled.img`
  height: 100%;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`

const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 80%;
  width: 60%;
  background-color: #e1f1fc;
  border-radius: 2rem;
`

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  height: 60%;

  &.cat {
    height: 100%;
  }
`

const Img = styled.img`
  height: 100%;
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 50%;
`

const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ErrorIcon = styled(TbError404)`
  font-size: 4rem;
  margin-bottom: 1rem;
`

const Text = styled.div`
  font-family: Minseo;

  &.h2 {
    font-size: 2rem;
  }

  &.h3 {
    font-size: 1.5rem;
  }
`
const HomeDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 40%;
`

const CatDiv = styled.div`
  height: 100%;
`

const Error = () => {
  return (
    <Background>
      <Header>
        <Link to={'/main'}>
          <Logo src={logo}></Logo>
        </Link>
      </Header>

      <Container>
        <Content>
          <ImgDiv>
            <Img src={bear}></Img>
          </ImgDiv>

          <RightBox>
            <TextDiv>
              <ErrorIcon></ErrorIcon>
              <Text className="h2">띠요용...여긴 아무것도 없어요...</Text>
            </TextDiv>
            <HomeDiv>
              <CatDiv>
                <Link className="cat" to={'/main'}>
                  <Img src={cat}></Img>
                </Link>
              </CatDiv>

              <Text className="h3">길을 잃었다면 저를 따라오라냥</Text>
            </HomeDiv>
          </RightBox>
        </Content>
      </Container>
    </Background>
  )
}

export default Error
