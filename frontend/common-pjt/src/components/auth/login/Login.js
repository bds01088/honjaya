import styled from 'styled-components'
import LoginForm from './LoginForm'



const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
  background-color: #FFFDDE;
  overflow: hidden;
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