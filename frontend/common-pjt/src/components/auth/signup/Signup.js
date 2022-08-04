import styled from 'styled-components'
import SignupForm from './SignupForm'



const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
  background-color: #FFFDDE;
  overflow: auto;
  font-family: Jua;
`

const Signup = () => {
  return (
    <Background>      
      <SignupForm>  
      </SignupForm>
    </Background>
  )
}

export default Signup
