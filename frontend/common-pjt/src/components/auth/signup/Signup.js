import styled from 'styled-components'
import SignupForm from './SignupForm'
import backImg from '../../../assets/base.PNG'



const Background = styled.div`
  background-image: url(${backImg});
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
  background-color: #FFFDDE;
  overflow: auto;
  font-family: Minseo;
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
