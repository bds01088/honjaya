import React from 'react'
import styled from 'styled-components'
import logo from '../../../assets/logo.png'


const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`

const Header = styled.div`
    display: flex;
    justify-content: center;
`

const Logo = styled.img`
  /* position: fixed; */
  /* display: inline; */
  margin-left: 2rem;
`

const Container = styled.div`

`

const ImgBox = styled.div`

`

const FormBox = styled.form`

`

const LeftBox = styled.div`

`
const RightBox = styled.div`
`

const UpdateBtn = styled.div`

`



const UpdateProfile = () => {
  return (

    <Background>
        <Header>
            <Logo src={logo}></Logo>
        </Header>

        <Container>
            <ImgBox>
            </ImgBox>

            <FormBox>
                <LeftBox>
                </LeftBox>

                <RightBox>
                </RightBox>

                <UpdateBtn>
                </UpdateBtn>
            </FormBox>

        </Container>
    </Background>
  
  )
}

export default UpdateProfile
