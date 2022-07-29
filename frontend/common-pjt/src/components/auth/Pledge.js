import React from "react"
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import Button from '@mui/material/Button';
// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';


// const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#000000'
//       },
//     }}
// )

const Background = styled.div`
    background: #FFFDDE;
    width: 100vw;
    height: 100vh;
    position: fixed;
`

const Form = styled.form`

`


const PledgeTemplate = styled.div`
    background-color: #CCF3EE;
    width: 500px;
    height: 600px;
    margin: 0 auto;
    margin-top: 60px;
    border-radius: 3%;
    display: flex;
    justify-content: center;
    position: relative;
`

const Title = styled.div`
    display: flex;
    justify-content: flex-start;
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

    background-color: #ffffff;
    width: 400px;
    height: 370px;
    border-radius: 3%;
    position: absolute;
    top: 8rem;
    padding: 20px;
`
const Agree = styled.div`
    display: flex;
    position: absolute;
    top: 35rem;
   
`

const CheckBox = styled.input`
    position: absolute;
    right: 2rem;
    top: 0.1rem;
    
`

const Next = styled(Button)`
    position: absolute;
    left: 45%;
    top: 30px;
    color: #F38BA0;

`

// 체크 , 체크 해제 구분
// 체크 해제 했을 때 뜨는 문구 구현

const Pledge = () => {

    return (
        <Form>
            <Background>
                <PledgeTemplate className="Template">
                    <Title>
                        <Logo src={logo}/>
                        <Phrase >이용을 위한 서약서</Phrase>
                    </Title>
                    <TextBox>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </TextBox>
                    <Agree > 
                        <CheckBox type="checkbox" name="" value="동의"></CheckBox>
                        <label htmlFor="동의">동의</label>
                    </Agree>
                </PledgeTemplate>
                <Next color="primary"  variant="next">다음</Next>
            </Background>
        </Form>
    )
};

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