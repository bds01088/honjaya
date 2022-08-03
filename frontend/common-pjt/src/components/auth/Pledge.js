import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Form = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Jua;
  height: 80%;
  width: 35%;

  @media screen and (max-width: 1295px){
    width: 454px;
    height: 700px;
  }
`

const PledgeTemplate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  height: 100%;
  width: 100%;
  border-radius: 3%;
  background-color: #ccf3ee;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  height: 15%;
  margin: 1rem;
`

const Logo = styled.img`
  height: 100%;

  @media screen and (max-width: 1500px){
    height: 90%;
  }
`

const Phrase = styled.p`
  font-family: 'Jua';
  font-size: 2rem;
  padding-top: 2.5rem;
  color: #333333;

  @media screen and (max-width: 1500px){
    font-size: 1.6rem;
    padding-top: 3rem;
  }
`

const TextBox = styled.div`
  height: 62%;
  width: 80%;
  border-radius: 3%;
  padding: 1.5rem;
  background-color: #ffffff;
`

const Agree = styled.div`
  margin: 1rem;
  font-size: 1.2rem;
  display: flex;
`
const NotChecked = styled(MdOutlineCheckBoxOutlineBlank)`
  margin: 0 0.2rem;
`

const Checked = styled(MdOutlineCheckBox)`
  margin: 0 0.2rem;
`

const Button = styled.button`
  border: none;
  border-radius: 0.2rem;
  color: white;
  font-family: Jua;
  font-size: 1.3rem;
  padding: 0.5rem 2rem;
  margin: 1rem 0;
  background: #ff728e;

  &:disabled {
    background: #8a3849;
    color: #c2c2c2;
    cursor: not-allowed;
  }

  /* &:active {
    cursor: pointer;
    background: #ff728e;
  } */
`

const Pledge = () => {
  // 동의 체크 여부 판별
  const [check, setCheck] = useState(false)

  const clickEvent = () => {
    setCheck(!check)
  }

  return (
    <Background>
      <Form>

        <PledgeTemplate>
          <Title>
            <Logo src={logo} />
            <Phrase>이용을 위한 서약서</Phrase>
          </Title>
          <TextBox>
            <li style={{ fontFamily: 'Jua', fontSize: '1.5rem' }}>
              제발 이거는 지켜 주십쇼
            </li>
          </TextBox>
          <Agree onClick={clickEvent}>
            { check ? <Checked/> : <NotChecked/> }동의
          </Agree>
        </PledgeTemplate>

        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button disabled={!check} >다음</Button>
        </Link>

      </Form>
    </Background>
  )
}

export default Pledge
