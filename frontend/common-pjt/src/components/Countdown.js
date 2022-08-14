import styled from 'styled-components'
import React, { Component } from 'react'
import backGif from '../assets/countdown.gif'
import logoImg from '../assets/logo.png'

const Container = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`
const Background = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

const BackImg = styled.img.attrs({ src: `${backGif}`})`
  height: 100%;
  z-index: 10;
`

const LogoImg = styled.img.attrs({ src: `${logoImg}`})`
  position: fixed;
  top: 2rem;
  height: 20%;
  z-index: 11;
`

const Text = styled.div`
  font-family: Minseo;
  color: #333333;
  font-size: 2rem;
  position: fixed;
  top: 12rem;
  height: 20%;
  z-index: 11;
`

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLimit: 8,
    }
    this.intervalRef = React.createRef();
  }

  componentDidMount() {
    this.intervalRef.current = setInterval(() => {
      // timeLimit이 남은 경우, 카운팅
      if (this.state.timeLimit > 0) {
        this.setState((prevState) => ({
          timeLimit: prevState.timeLimit-1
        }));
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  componentWillUnmount() {
    // unmount 될때, 스톱워치 종료
    this.stopTimer();
  }

  // 스톱워치 종료 함수: clearInterval(변수)
  stopTimer = () => {
    clearInterval(this.intervalRef.current);
  }

  render() {
    return (
      <>
        { this.state.timeLimit > 0 ? 
        <Container>
          <Background>
            <LogoImg/>
            <Text>결과 집계중입니다 .. 🧐</Text>
            <BackImg/>
          </Background>
        </Container>
        : null }
      </>
    )
  }

};

export default Countdown;