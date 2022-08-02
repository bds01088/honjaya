import styled from 'styled-components'
import SignupForm from './SignupForm'


const SignupBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: yellow;
`

const Signup = () => {
  return (
    <SignupBlock>
      <SignupForm>        
      </SignupForm>
    </SignupBlock>
  )
}

export default Signup
