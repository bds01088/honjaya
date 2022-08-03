import styled from 'styled-components'
import LoginForm from './LoginForm'



const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #FFFDDE;
  overflow: hidden;
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