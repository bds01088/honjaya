/* eslint-disable no-unused-expressions */
import styled from 'styled-components'
import logoImg from '../assets/logo.png'
import React, { Component } from 'react'
import { MdLogout, MdVideocam, MdVideocamOff, MdCheckCircleOutline, MdOutlineHighlightOff } from 'react-icons/md'
import timerImg from '../assets/timer.png'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import axios from 'axios'
import myAxios from '../api/http'
import {connect} from 'react-redux'
import Webcam from 'react-webcam'
import { setMatchResponse } from './mode/mode-slice'
import { Navigate } from "react-router-dom"
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

const LeaveBox = styled.div`
  position: relative;
  margin-bottom: 1rem;

  &:hover .leaveTip {
    visibility: visible;
  }
`


const Leave = styled(MdLogout)`
  height: 100%;
  width: 2.3rem;
  margin: 0 2rem;
  color: #333333;
`

const LeaveText = styled.p`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  padding: 0.2rem 0.5rem;
  font-family: Jua;
  opacity: 80%;
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 50%;
  margin-left: -2rem;
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

  @media (max-height: 620px){
    margin: 0;
  }
`

const CamBox = styled.div`
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 960px){
    width: 426px;
  }

  @media (max-height: 620px){
    height: 403px;
  }
`

const CamContainer = styled(Webcam)`
  width: 100%;
  height: 100%;
  margin: 0 2rem;
  background-color: none;
  border-radius: 50%;
  border: 1rem solid #B5EAEA;
  object-fit: cover;
  z-index: 1;

  @media (max-width: 960px){
    height: 350px;
    width: 350px;
  }

  @media (max-height: 620px){
    height: 350px;
    width: 350px;
  }
`

const CamOffContainer = styled.div`
  width: 25rem;
  height: 25rem;
  margin: 0 2rem;
  background-color: #CCF3EE;
  border-radius: 50%;
  border: 1rem solid #B5EAEA;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 960px){
    height: 350px;
    width: 350px;
  }

  @media (max-height: 620px){
    height: 350px;
    width: 350px;
  }
`

const LogoImg = styled.img.attrs({ src:`${logoImg}` })`
  position: absolute;
  width: 80%;
  margin-bottom: 1.5rem;
`

const GuideBox = styled.div`
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
  margin: 0 2rem 1rem 2rem;
  background-color: #B5EAEA;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (max-width: 960px){
    width: 300px;
  }

  @media (max-height: 620px){
    height: 370px;
  }
`
const CheckIcon = styled(MdCheckCircleOutline)`
  text-align: center;
  margin-right: 0.5rem;
  color: green;
`

const BanIcon = styled(MdOutlineHighlightOff)`
  text-align: center;
  margin-right: 0.5rem;
  color: #FF0000;
`

const GuideHeader = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  font-family: Jua;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px ridge  #333333;

  @media (max-width: 960px){
    font-size: 1.5rem;
  }

`

const GuideText = styled.div`
  padding: 1rem 2.5rem;
  font-size: 1.5rem;
  font-family: Jua;
  color: #333333;
  display: flex;
  align-items: center;

  @media (max-width: 960px){
    font-size: 1rem;
    padding: 0.8rem 2.5rem;
  }
`

const CamOn = styled(MdVideocam)`
  font-size: 2.5rem;
  color: #333333;
  margin-top: 1.5rem;
`

const CamOff = styled(MdVideocamOff)`
  font-size: 2.5rem;
  color: #333333;
  margin-top: 1.5rem;
`

class Waiting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      uuid: undefined,
      nowmatching: true,

      // total : undefined,
      // roleCode: undefined,

      // 3분의 시간제한
      timeLimit: 0,
      minute: 0,
      sec: 0,

      videoSet: true,
    }

    this.intervalRef = React.createRef();
  }

  componentDidMount() {
    const { mode } = this.props
    console.log("mode 출력하기", mode)
    const total = mode.total
    const roleCode = mode.roleCode
    console.log("total, roleCode", total, roleCode)
    const data = {
      total, roleCode
    }
    console.log(data.total)
    this.matchStart(data)
    this.intervalRef.current = setInterval(() => {
      // timeLimit이 남은 경우, 카운팅
      if (this.state.timeLimit >= 0) {
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

  videoOnOff = () => {
    const val = !this.state.videoSet
    this.setState({ videoSet: val })
  }

  matchStart(data) {
    console.log("데이터잘담기나?", data.total)
    
    console.log("uuid 요청보냄")
    myAxios.post(
        'https://i7e104.p.ssafy.io/honjaya/meetings/ready',
        {
          "total": data.total,
          "roleCode": data.roleCode
        }
      ).then(res => {
        console.log("uuid 응답 받아옴")
        console.log(res.data)
        if (res.data.result === 1){
            this.setState({
              uuid : res.data.uuid,
              nowmatching : false
            })
            console.log("slice에 응답 저장")
            this.props.setMatchResponse(res.data)
            console.log("slice에 응답 저장됌")
        }else if (res.data.result === -1 ){
          console.log("응답왔지만 매칭안됌")
          this.setState({
            uuid : undefined,
            nowmatching : false
          })
          this.resetTimer()
        } else console.log("취소됌")
      }
      ).then(() => {
          if (this.uuid !== undefined && this.nowmatching === false){
            // this.props.navigate('/meeting')
            // this.state.redirect && <Navigate to='/meeting'/>
            this.setState({redirect: true})
            // eslint-disable-next-line no-lone-blocks
            { this.state.redirect ? <Navigate to="/meeting"/> : null }
          }
  
      }
      ).catch(err => {
        console.log(err)
        }
      )
  }

  cancelMatching() {
    console.log("cancel 요청보냄")
    axios.get(
        'https://i7e104.p.ssafy.io/honjaya/meetings/cancel',
      ).then(res => {
        console.log("cancel 결과")
        console.log(res.data)
        // this.setState({
        //   uuid : res.data.uuid,
        //   nowmatching : false
        //   })
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
          <LeaveBox onClick={this.cancelMatching}>
            <Leave />
            <LeaveText className="leaveTip">나가기</LeaveText>
          </LeaveBox>
        </Header>

        { this.state.uuid === undefined ? 
        <Background>
          <SpinnerBox>
            <TimerBox>
              <TimerImg/>
              <Timer>
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
              <CamOffContainer>
                <LogoImg/>
                {this.state.videoSet ? 
                  <CamContainer /> : null
                }
              </CamOffContainer>
              { this.state.videoSet ? <CamOn onClick={this.videoOnOff}/> : <CamOff onClick={this.videoOnOff}/> }
            </CamBox>
            <GuideBox>
              <GuideContainer>
                <GuideHeader>이것만은 지켜주세요 !</GuideHeader>
                <GuideText><CheckIcon/>서로를 존중해요</GuideText>
                <GuideText><CheckIcon/>다른 사람의 이야기를 경청해요</GuideText>
                <GuideText><CheckIcon/>본인의 역할에 집중해요</GuideText>
                <GuideText><BanIcon/>과도한 요구는 자제해요</GuideText>
                <GuideText><BanIcon/>욕설 및 비속어는 금지해요</GuideText>
                <GuideText><BanIcon/>성적인 콘텐츠 및 행위를 금지해요</GuideText>
              </GuideContainer>
            </GuideBox>
          </CamGuideBox>
        </Background> : null }
      </Background>
    )
  }
}

const mapStateToProps = (state) => ({
  mode: state.mode,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setMatchResponse: (res) => dispatch(setMatchResponse(res))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Waiting)