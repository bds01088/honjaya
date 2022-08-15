import styled from 'styled-components'
import LoginForm from './LoginForm'
import backImg from '../../../assets/base.PNG'



const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-color: #FFFDDE;
  background-size: cover;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Jua;
`

const Login = () => {
  return (
    <Background>      
      <LoginForm>  
      </LoginForm>
    </Background>
  )
}

export default Login