import styled from 'styled-components'
import logoImg from '../assets/logo.png'
import React, { Component } from 'react'
import { MdHelpOutline } from 'react-icons/md'
import timerImg from '../assets/timer.png'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Background = styled.div`
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  position: absolute;
  top: 1%;
  left: 0;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: end;
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
  position: fixed;
  top: 0;
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
  font-size: 1.6rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 70%;
  margin-bottom: 2rem;
`

const CamBox = styled.div`
  /* border: 3px solid black; */
  width: 49%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 960px){
    width: 426px;
  }

  @media (max-height: 620px){
    height: 403px;
  }
`

const CamContainer = styled.div`
  width: 27rem;
  height: 27rem;
  margin: 0 2rem;
  background-color: #B5EAEA;
  border-radius: 50%;

  @media (max-width: 960px){
    height: 350px;
    width: 350px;
  }

  @media (max-height: 620px){
    height: 350px;
    width: 350px;
  }
`

const GuideBox = styled.div`
  /* border: 3px solid black; */
  width: 49%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;

  @media (max-width: 960px){
    width: 426px;
  }

  @media (max-height: 620px){
    height: 403px;
  }
`
const GuideContainer = styled.div`
  width: 70%;
  height: 93%;
  margin: 0 2rem;
  background-color: #B5EAEA;
  border-radius: 5%;

  @media (max-width: 960px){
    width: 300px;
  }

  @media (max-height: 620px){
    height: 370px;
  }
`


class Waiting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: undefined,
      nowmatching: true,

      // 3분의 시간제한
      timeLimit: 0,
      minute: 0,
      sec: 0
    }

    this.intervalRef = React.createRef();
  }

  componentDidMount() {
    this.getUuid()
    this.intervalRef.current = setInterval(() => {
      // timeLimit이 남은 경우, 카운팅
      if (this.state.timeLimit > 0) {
        this.setState((prevState) => ({
          timeLimit: prevState.timeLimit+1,
          minute: parseInt((prevState.timeLimit+1)/60),
          sec: (prevState.timeLimit+1)%60
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
    this.setState({ timeLimit: 0 })
  }

  getUuid() {
    console.log("uuid 요청보냄")
    axios.post(
        'https://i7e104.p.ssafy.io/honjaya/meetings/ready',
        {
          "userGender": "m",
          "total": 2,
          "oppositeGender": "false",
          "roleCode": 1
        }
      ).then(res => {
        console.log("uuid 받아옴")
        console.log(res.data.uuid)
        this.setState({
          uuid : res.data.uuid,
          nowmatching : false
        })
        }
      ).catch(err => {
        console.log(err)
        }
      )
  }

  render() {
    return (
      <Background>
        <Header>
          <Logo/>
          <Helper/>
        </Header>
        { this.state.uuid === undefined ? 
        <Background>
          <SpinnerBox>
            <TimerBox>
              <TimerImg/>
              <Timer onClick={this.stopTimer}>
                {this.state.minute}:{this.state.sec < 10 ? 0: null}
                {this.state.sec}
              </Timer>
            </TimerBox>
            { this.state.nowmatching === true && this.state.uuid === undefined ? 
              <><HashLoader color="#e5a0a0" /><StatusText>유저를 찾고 있습니다 ...</StatusText></> 
              : <><StatusText>현재 매칭 가능한 상대가 없습니다<br/>다시 연결하시겠습니까?</StatusText>
                <div><ChoiceBtn className="yes" onClick={this.resetTimer}>O</ChoiceBtn> / <Link to="/main"><ChoiceBtn className="no">X</ChoiceBtn></Link></div>
            </>  }
          </SpinnerBox>
          
          <CamGuideBox>
            <CamBox>
              <CamContainer>

              </CamContainer>
            </CamBox>
            <GuideBox>
              <GuideContainer>
              </GuideContainer>
            </GuideBox>
          </CamGuideBox>
        </Background>
         : <div>SSAFY</div>}
      </Background>
    )
  }
}

export default Waiting
