import styled from 'styled-components'
import logoImg from '../assets/logo.png'
import React, { Component } from 'react'
import { MdHelpOutline } from 'react-icons/md'
import timerImg from '../assets/timer.png'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

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

const SpinnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: absolute;
  top: 5%;
`
const TimerBox = styled.div`
  background-color: #F6A9A9;
  padding: 0.5rem 1rem;
  border-radius: 1.8rem;
  display: flex;
  align-items: center;
  margin: 1rem;
`
const Timer = styled.p`
  font-size: 1.8rem;
  font-family: Jua;
  margin: 0 0.5rem;
`

const TimerImg = styled.img.attrs({ src: `${timerImg}`})`
  height: 2rem;
`

const StatusText = styled.p`
  font-size: 1.2rem;
  font-family: Jua;
  margin: 1rem;
  text-align: center;
`

const ChoiceBtn = styled.button`
  font-size: 1.3rem;
  font-family: Jua;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  border: none;

  &.yes {
    background-color: #40C0E7;
  }

  &.no {
    background-color: #F38BA0;
  }
`

const CamGuideBox = styled.div`
  position: absolute;
  top: 28%;
  display: flex;
  width: 90%;
  height: 65%;
`

const CamBox = styled.div`
  border: 3px solid black;
  width: 50%;
  height: 100%;
`

const GuideBox = styled.div`
  border: 3px solid black;
  width: 50%;
  height: 100%;
`



class Waiting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 3분의 시간제한
      timeLimit: 3,
      minute: 3,
      sec: 0
    }

    this.intervalRef = React.createRef();
  }

  componentDidMount() {
    this.intervalRef.current = setInterval(() => {
      // timeLimit이 남은 경우, 카운팅
      if (this.state.timeLimit > 0) {
        this.setState((prevState) => ({
          timeLimit: prevState.timeLimit - 1,
          minute: parseInt((prevState.timeLimit-1)/60),
          sec: (prevState.timeLimit-1)%60
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
  }

  resetTimer = () => {
    this.setState({ timeLimit: 180 })
  }


  render() {
    return (
      <Background>
        <Header>
          <Logo/>
          <Helper/>
        </Header>

        <SpinnerBox>
          <TimerBox>
            <TimerImg/>
            <Timer onClick={this.stopTimer}>
              {this.state.minute}:{this.state.sec < 10 ? 0: null}
              {this.state.sec}
            </Timer>
          </TimerBox>
          { this.state.timeLimit ? 
            <><HashLoader color="#e5a0a0" /><StatusText>유저를 찾고 있습니다 ...</StatusText></> 
            : <><StatusText>현재 매칭 가능한 상대가 없습니다<br/>다시 연결하시겠습니까?</StatusText>
              <div><ChoiceBtn className="yes" onClick={this.resetTimer}>O</ChoiceBtn> / <Link to="/main"><ChoiceBtn className="no">X</ChoiceBtn></Link></div>
          </>  }
        </SpinnerBox>
        
        <CamGuideBox>
          <CamBox/>
          <GuideBox/>
        </CamGuideBox>
      </Background>
    )
  }
}

export default Waiting
