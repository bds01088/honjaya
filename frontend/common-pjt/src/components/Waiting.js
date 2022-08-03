import styled from 'styled-components'
import logoImg from '../assets/logo.png'
import React, { Component } from 'react'
import { MdHelpOutline } from 'react-icons/md'
import timerImg from '../assets/timer.png'

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: relative;
`

const Header = styled.div`
  position: absolute;
  top: 1%;
  left: 0;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const Logo = styled.img.attrs({ src:`${logoImg}` })`
  height: 100%;
  margin: 0 2rem;
`

const Helper = styled(MdHelpOutline)`
  height: 100%;
  width: 2.5rem;
  margin: 0 2rem;
  color: #333333;
`
const TimerBox = styled.div`
  background-color: #F6A9A9;
  padding: 0.5rem 1rem;
  border-radius: 1.8rem;
  display: flex;
  align-items: center;
`
const Timer = styled.p`
  font-size: 1.8rem;
  font-family: Jua;
  margin: 0 0.5rem;
`

const TimerImg = styled.img.attrs({ src: `${timerImg}`})`
  height: 2rem;
`

class Waiting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 3분의 시간제한
      timeLimit: 180
    }

    this.intervalRef = React.createRef();
  }

  componentDidMount() {
    this.intervalRef.current = setInterval(() => {
      // timeLimit이 남은 경우, 카운팅
      if (this.state.timeLimit > 0) {
        this.setState((prevState) => ({
          timeLimit: prevState.timeLimit - 1
        }));
      } else {
        // 스톱워치 종료
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
  };


  render() {
    return (
      <Background>
        <Header>
          <Logo/>
          <TimerBox>
            <TimerImg/>
            <Timer onClick={this.stopTimer}>
              {this.state.timeLimit}
            </Timer>
          </TimerBox>
          <Helper/>
        </Header>
      </Background>
    )
  }
}

export default Waiting
