import React, { useState } from "react"
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
// 체크 , 체크 해제 구분


const Background = styled.div`
    background: #FFFDDE;
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
    margin-top: 30px;
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
    font-size: 25px;
    padding-top: 15px;
`

const TextBox = styled.div`
    position: absolute;
    top: 8rem;
    height: 370px;
    width: 400px;
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

// !! 스타일 수정 필요
const Next = styled(Button)`
    top: 30px;
    color: #F38BA0;
    background-color: "#F38BA0";

`

// const StyledButton = styled.button`
//   /* 공통 스타일 */
//   display: inline-flex;
//   outline: none;
//   border: none;
//   border-radius: 4px;
//   color: white;
//   font-weight: bold;
//   cursor: pointer;
//   padding-left: 1rem;
//   padding-right: 1rem;

//   /* 크기 */
//   height: 2.25rem;
//   font-size: 1rem;

//   /* 색상 */
//   background: #F38BA0;
//   &:hover {
//     background: #FA99AC;
//   }
//   &:active {
//     background: #FF728E;
//   }

//   /* 기타 */
//   & + & {
//     margin-left: 1rem;
//   }
// `

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
    
    console.log(check);
    return (
        <Background>
            <Form>
                <PledgeTemplate className="Template">
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
                
                {/* Signup 이동 버튼  */}
                <Link to="/signup" style={{ textDecoration: 'none'}}>
                    <Next disabled={!check}
                        variant="contained"
                        >다음
                    </Next>
                </Link>

                
            {/* <StyledButton>다음</StyledButton> */}
            </Form>
        </Background>
    )
}

export default Pledge

/*
import styled from 'styled-components'
import backImg from '../../assets/main_img.jpg'

const Container = styled.div`
    background-image: url(${backImg});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    position: fixed;
`


const Main = () => {

    return (
            <Container>
            </Container>
        )
}

export default Main
*/