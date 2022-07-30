import React, { useState } from "react"
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Background = styled.div`
    background-color: #FFFDDE;
    width: 100vw;
    height: 100vh;    
`

const Form = styled.div`
    display: flex;
    justify-content: center; 
    flex-direction: column; 
    align-items: center;
`

const PledgeTemplate = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 1rem;
    height: 600px;
    width: 500px;
    border-radius: 3%;
    background-color: #CCF3EE;
`

const Title = styled.div`
    display: flex;
    height: 15%;
    margin: 1.2rem;
`

const Logo = styled.img`
    height: 100%;
`

const Phrase = styled.p`
    font-family: 'Jua';
    font-size: 2rem;
    padding-top: 2.5rem;
    color: #333333;
`

const TextBox = styled.div`
    position: absolute;
    top: 8rem;
    height: 62%;
    width: 80%;
    border-radius: 3%;
    padding: 20px;
    background-color: #ffffff;
`

const Agree = styled.div`
    position: absolute;
    top: 35rem;
   
`
const CheckBox = styled.input`
    position: absolute;
    right: 2rem;
    top: 0.1rem;
    
`

const StyledButton = styled.button`
  /* 공통 스타일 */
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 30%;

  /* 크기 */
  height: 2.25rem;
  width: 7rem;
  font-size: 1rem;

  /* 색상 */
  background: #FF728E;
  
  &:hover {
    background: #F38BA0;
  }
  &:active {
    background: #FF728E;
  }

`
 
const Pledge = () => {

    // 동의 체크 여부 판별
    const [check, setCheck] = useState(false);
    const clickEvent = () => {
        if (check === false){
            setCheck(true)
        } else{
            setCheck(false)
        }
    }

    return (
        <Background>
            <Form>
                <PledgeTemplate>
                    <Title>
                        <Logo src={logo}/>
                        <Phrase >이용을 위한 서약서</Phrase>
                    </Title>
                    <TextBox>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </TextBox>
                    <Agree> 
                        <CheckBox type="checkbox" checked={check} onChange={clickEvent}></CheckBox>
                        <label>동의</label>
                    </Agree>
                </PledgeTemplate>
                <Link to="/signup" style={{ textDecoration: 'none'}}>
                    <StyledButton disabled={!check}   
                        >다음
                    </StyledButton>
                </Link>
            </Form>
        </Background>
    )
}

export default Pledge