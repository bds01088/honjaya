import axios from 'axios'
import { OpenVidu } from 'openvidu-browser'
import React, { Component } from 'react'
import UserVideoComponent from './UserVideoComponent'
import Countdown from '../Countdown'
import { connect } from 'react-redux'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import addTimerImg from '../../assets/add-timer.png'
import backImg from '../../assets/base.PNG'
import pointImg from '../../assets/carrot.png'
import {
  MdHelpOutline,
  MdLogout,
  MdSmartToy,
  MdOutlineChangeCircle,
  MdVideocam,
  MdVideocamOff,
  MdMic,
  MdMicOff,
} from 'react-icons/md'

import Messages from './meeting-chat/Messages'

import myAxios from '../../api/http'
import { loadUser } from '../auth/login/login-slice'
// import { compareResult } from './vote-slice'
// import randomTopic from '../../DATA/randomTopic.json'

const OPENVIDU_SERVER_URL = 'https://i7e104.p.ssafy.io:4443'
// const OPENVIDU_SERVER_URL = 'https://coach82.p.ssafy.io:4443'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'

// 전체 배경
const Background = styled.div`
  background-image: url(${backImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #fffdde;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

// Header: 로고, 타이머, 포인트, 도움말
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  width: 96%;
  padding: 0.5rem 2%;
`

// 헤더로고
const LogoBox = styled.div`
  height: 100%;

  @media (max-height: 720px) {
    height: 64px;
  }
`
const Logo = styled.img.attrs({ src: `${logo}` })`
  height: 100%;
`

// 타이머
const TimerBox = styled.div`
  background-color: #f6a9a9;
  padding: 0.4rem 1rem;
  border-radius: 1.8rem;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  position: relative;
`

const Timer = styled.p`
  font-size: 1.6rem;
  font-family: Jua;
  margin: 0 0.5rem;
`

// 타이머 연장
const AddBox = styled.div`
  position: relative;

  &:hover .timerTip {
    visibility: visible;
  }
`

const AddTimerImg = styled.img.attrs({ src: `${addTimerImg}` })`
  height: 2rem;
  z-index: 1;
`

const AddText = styled.span`
  visibility: hidden;
  width: 100px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  padding: 2px 0;
  font-family: Jua;
  opacity: 80%;

  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -3rem;
`

const TimerCheckBox = styled.div`
  position: absolute;
  top: 15%;
  right: 0%;
  margin-right: -7rem;
  display: flex;
`

const TimerCheckBtn = styled.button`
  border: 0;
  border-radius: 0.3rem;
  font-family: Jua;
  font-size: 1.1rem;
  width: 3rem;
  padding: 0.4rem 0.3rem;

  &.ok {
    background-color: #b5eaea;
    margin-right: 0.2rem;
  }

  &.no {
    background-color: #ff728e;
  }
`

// 포인트
const LeftBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const PointImg = styled.img.attrs({ src: `${pointImg}` })`
  height: 1.8rem;
`
const PointText = styled.p`
  color: #333333;
  font-size: 1.5rem;
  font-family: Jua;
  margin-right: 1rem;
`

const Helper = styled(MdHelpOutline)`
  /* margin-right: 2rem; */
  color: #333333;
  font-size: 1.8rem;
`

const Container = styled.div`
  /* outline: 3px solid; */
  width: 100%;
  height: 90%;
`
const TopicBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5%;
  width: 100%;
  padding: 1rem;
  background-color: #f6a9a9;
  margin-bottom: 0.5rem;
`

const TopicText = styled.p`
  font-family: Minseo;
  font-size: 1.8rem;
`

const ChangeBox = styled.div`
  position: relative;

  &:hover .changeTip {
    visibility: visible;
  }
`

const TopicIcon = styled(MdOutlineChangeCircle)`
  font-size: 2rem;
  padding: 0 1rem;
`

const ChangeText = styled.span`
  visibility: hidden;
  width: 100px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  padding: 2px 0;
  font-family: Jua;
  opacity: 80%;

  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -3rem;
`

const SessionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  position: relative;
`

// 채팅창 + 비디오
const ChatVideoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 95%;
`

const ChatBox = styled.div`
  width: 20%;
  height: 95%;
  padding: 0 2%;
  position: relative;
`

const MessageBox = styled.div`
  height: 76%;
  width: 100%;
  /* border: 2px solid; */
  overflow-y: scroll;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 15%;
    background-color: #ffcaca;
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffecec;
    border-radius: 2rem;
  }
`

const MyInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 110%;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  font-family: Minseo;
  font-size: 1.3rem;
  color: #93adeb;
`

const InfoIcon = styled(MdSmartToy)`
  color: #1c3879;
  font-size: 1.8rem;
  margin-right: 0.2rem;
`

const InfoPoint = styled.span`
  font-family: Minseo;
  font-size: 1.4rem;
  color: #4f6aa8;
  margin: 0 0.2rem;
  font-weight: 600;
`

const VideoBox = styled.div`
  display: grid;
  /* align-items: end; */
  grid-template-columns: 55% 55%;
  grid-template-rows: repeat(2 1fr);
  /* grid-gap: 1rem; */
  width: 60%;
  height: 100%;
  background-color: #b5eaea;
  border-radius: 1rem;
  border: 4px dashed #5fcac3;

  /* outline: 1px solid green; */
`

const SendMsgBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`

const SendMsg = styled.input`
  width: 70%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 0;
  border-bottom: 2px solid #333333;
  font-size: 1.3rem;
  font-family: Minseo;
`

const SendBtn = styled.p`
  background-color: #fcd1d1;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-family: Minseo;
  border: 0;
  border-bottom: 2px solid #333333;
`

const CommanderWarn = styled.div`
  font-family: Minseo;
  color: red;
  padding: 0 1rem;
`

// 캠 on/off + 나가기
const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 1.5rem;
`

const MicCamBox = styled.div`
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// 마이크, 카메라 on/off
const MicOn = styled(MdMic)`
  color: #7e6752;
`
const MicOff = styled(MdMicOff)`
  color: #7e6752;
`
const CamOn = styled(MdVideocam)`
  color: #7e6752;
`
const CamOff = styled(MdVideocamOff)`
  color: #7e6752;
`

// 나가기 버튼
const LeaveBox = styled.div`
  right: 0;
  position: relative;

  &:hover .leaveTip {
    visibility: visible;
  }
`

const Leave = styled(MdLogout)`
  height: 100%;
  width: 2rem;
  margin: 0 2rem;
  color: #f38ba0;
`

const LeaveText = styled.p`
  visibility: hidden;
  background-color: #f38ba0;
  color: #fff;
  text-align: center;
  border-radius: 0.3rem;
  padding: 0.2rem 0.5rem;
  font-family: Jua;
  opacity: 80%;
  position: absolute;
  z-index: 2;
  top: 0%;
  margin-top: -2rem;
  left: 50%;
  margin-left: -1.9rem;
`

class Meeting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 세션 정보
      mySessionId: undefined,
      // myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      // myUserNickname: undefined,
      myUserName: undefined,
      // 10분의 시간제한
      timeLimit: 10,
      minute: 10,
      sec: 0,
      myUserPoint: 0,
      showAddTimer: false,

      //채팅관련
      message: '',
      messages: [],
      pairUser: undefined,
      chatConnection: [],
      user: undefined,

      //해쉬태그
      hashList: [],

      //랜덤주제
      randomTopic: '리액트 vs 뷰',
      topicList: [
        '좋아하는 웹툰',
        '좋아하는 영화',
        '좋아하는 음식',
        '최근에 간 여행지',
        'mbti',
      ],
      randomCount: 3,

      //롤코드
      myRoleCode: undefined,
      roleList: ['솔로', '아바타', '지시자'],
      //이건 flag 역할인가
      check: false,

      // 비디오, 오디오 기본 설정
      videostate: true,
      audiostate: true,

      // 시간 분리
      meetingTime: true,
      voteTime: false,
      resultTime: false,

      // 투표 결과
      // result: {},
      correctPoint: 0,
      wrongPoint: 0,
      calcReult: false,
      pairConnection: null,
      ranking: null || {},
    }

    // openVidu
    this.joinSession = this.joinSession.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.switchCamera = this.switchCamera.bind(this)
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this)
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this)
    this.onbeforeunload = this.onbeforeunload.bind(this)

    // 타이머 설정
    this.intervalRef = React.createRef()

    // 랜덤 주제 설정
    this.pickTopic = this.pickTopic.bind(this)
    this.addTimer = this.addTimer.bind(this)
    this.setTimer = this.setTimer.bind(this)

    // 페이지 이동
    this.moveToVote = this.moveToVote.bind(this)
    this.moveToResult = this.moveToResult.bind(this)

    //채팅
    this.sendmessageByClick = this.sendmessageByClick.bind(this)
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this)
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this)

    // 투표결과 불러오기
    // this.setResult = this.setResult.bind(this)
    this.compareResult = this.compareResult.bind(this)
  }

  componentDidMount() {
    const { mode } = this.props
    const { login } = this.props
    const { hashtag } = this.props
    const { userNickname, userPoint } = login.user
    const { hashesOwned } = hashtag
    const { uuid, roleCode, user } = mode

    if (roleCode !== 1) {
      const pairUser = mode.pairUser
      console.log('페어유저 정보 저장', pairUser)
      this.setState({ pairUser: pairUser })
    }

    this.setState({
      mySessionId: uuid,
    })

    this.joinSession()

    // openVidu
    window.addEventListener('beforeunload', this.onbeforeunload)

    // 타이머
    this.intervalRef.current = setInterval(() => {
      // timeLimit이 남은 경우, 카운팅
      if (this.state.timeLimit > 0) {
        this.setState((prevState) => ({
          timeLimit: prevState.timeLimit - 1,
          minute: parseInt((prevState.timeLimit - 1) / 60),
          sec: (prevState.timeLimit - 1) % 60,
        }))
      } else {
        if (this.state.meetingTime) {
          this.moveToVote()
        } else if (this.state.voteTime) {
          if (!this.state.calcResult) {
            this.compareResult()
            this.moveToResult()
          }
        }
      }
    }, 1000)

    //음 this.setState를 왜 따로 해주고 있지
    this.setState({
      myUserName: userNickname,
      myUserPoint: userPoint,
      hashList: hashesOwned,
      myRoleCode: roleCode,
      myUserData: user,
    })
  }

  componentWillUnmount() {
    //openVidu
    window.removeEventListener('beforeunload', this.onbeforeunload)

    // unmount 될때, 스톱워치 종료
    this.stopTimer()
  }

  // 스톱워치 종료 함수: clearInterval(변수)
  stopTimer = () => {
    clearInterval(this.intervalRef.current)
  }

  // 스톱워치 시간 추가 함수
  async addTimer() {
    try {
      await this.setState({ timeLimit: this.state.timeLimit + 180 })
      await this.setState({ showAddTimer: false })
      await this.state.session.signal({
        data: `${this.state.timeLimit}`,
        to: [],
        type: 'addTime',
      })

      const res = await myAxios.put('/honjaya/points', {
        point: 100,
      })
      console.log('포인트수정', res)

      await this.setState({
        myUserPoint: res.data.point,
      })
    } catch (err) {
      console.log('error')
    }
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" })
    }
  }

  // 스톱워치 초기 설정 함수
  async setTimer() {
    try {
      await this.setState({
        meetingTime: true,
        voteTime: false,
        resultTime: false,
        timeLimit: 10,
      })
      await this.state.session.signal({
        data: `${this.state.timeLimit}`,
        to: [],
        type: 'setTime',
      })
    } catch (err) {
      console.log('error')
    }
  }

  // 투표화면으로 이동
  async moveToVote() {
    try {
      await this.setState({
        meetingTime: false,
        voteTime: true,
        resultTime: false,
        timeLimit: 21,
      })
      await this.state.session.signal({
        data: `${this.state.timeLimit}`,
        to: [],
        type: 'timeToVote',
      })
    } catch (err) {
      console.log('error')
    }
  }

  // 결과 비교
  async compareResult() {
    const { result } = this.props.vote
    const { vote } = this.props.vote
    const { connections } = this.props.vote
    let wrongList = null || []

    console.log('결과 비교할거야 아아아 !!!!!!')
    await Object.entries(result).map((item, idx) => {
      // user를 안 누른 경우, default = 1
      // 1. 결과가 vote에 없는 경우(누르지 않은 경우), 해당 유저가 솔로거나
      // 2. 결과가 vote에 있는 경우, vote에 저장된 결과와 실제 역할이 일치한다면 correctPoint + 100
      console.log('확인할거다 딱대 !!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log('vote', item[0], item[1], vote[item[0]])
      if (
        (!vote[item[0]] && item[1] === 1) ||
        (vote[item[0]] && item[1] === vote[item[0]])
      ) {
        console.log(
          '오예 맞았다 !',
          item[0],
          item[1],
          vote[item[0]],
          this.state.correctPoint + 100,
        )
        return this.setState({ correctPoint: this.state.correctPoint + 100 })
      } else {
        // 틀린 경우에는 해당 유저의 점수 + 50
        return wrongList.push(item[0])
      }
    })

    await console.log('땡', wrongList)

    // 내가 틀린 사람들에게 점수 주기
    await wrongList.map((item, idx) => {
      return this.state.session.signal({
        data: this.state.myUserName,
        to: [connections[item]],
        type: 'plusPoint',
      })
    })

    await this.setState({ calcResult: true })

    // 최종 포인트 보내기
    await setTimeout(() => {
      this.state.session.signal({
        data: this.state.correctPoint + this.state.wrongPoint,
        to: [],
        type: 'sendScore',
      })
    }, 4000)
  }

  // 결과화면으로 이동
  async moveToResult() {
    try {
      await this.setState({
        meetingTime: false,
        voteTime: false,
        resultTime: true,
        timeLimit: 0,
      })
      await this.state.session.signal({
        data: `${this.state.timeLimit}`,
        to: [],
        type: 'timeToResult',
      })
      await this.stopTimer()
    } catch (err) {
      console.log('error')
    }
  }

  // 스톱워치 시간 모달 함수
  showSelectTimer = () => {
    this.setState({ showAddTimer: !this.state.showAddTimer })
  }

  onbeforeunload(event) {
    this.leaveSession()
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    })
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    })
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      })
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers
    let index = subscribers.indexOf(streamManager, 0)
    if (index > -1) {
      subscribers.splice(index, 1)
      this.setState({
        subscribers: subscribers,
      })
    }
  }

  //시그널을 보내고 자바스크립트서버에서 듣고 들은걸 다시
  //랜덤 주제 픽
  shuffleTopic() {
    //shuffle arr
    let arr = new Array()
    for (var i = 0; i < 5; i++) {
      arr[i] = i
    }
    arr.sort(() => Math.random() - 0.5)
    // randomTopic 바꿔주기
    this.setState({ randomTopic: this.state.topicList[arr[0]] })
  }

  async pickTopic() {
    try {
      //토픽바꾸기

      await this.shuffleTopic()
      this.state.session.signal({
        data: `${this.state.randomTopic}`,
        to: [],
        type: 'randomTopic',
      })

      if (this.state.randomCount <= 0) {
        const res = await myAxios.put('/honjaya/points', {
          point: 300,
        })
        console.log('포인트수정', res)

        await this.setState({
          myUserPoint: res.data.point,
        })
      } else {
        this.setState({ randomCount: this.state.randomCount - 1 })
      }
    } catch (err) {
      console.log('error')
    }
  }

  //채팅 보내는 함수
  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    })
  }

  sendmessageByClick() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          userName: this.state.myUserName,
          text: this.state.message,
          chatClass: 'messages__item--operator',
        },
      ],
    })
    const mySession = this.state.session

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [this.state.chatConnection],
      type: 'chat',
    })

    this.setState({
      message: '',
    })
  }

  sendmessageByEnter(e) {
    if (e.key === 'Enter') {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: 'messages__item--operator',
          },
        ],
      })
      const mySession = this.state.session

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [this.state.chatConnection],
        type: 'chat',
      })

      this.setState({
        message: '',
      })
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu()

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined)
          var subscribers = this.state.subscribers
          subscribers.push(subscriber)
          if (
            this.state.myRoleCode === 3 &&
            JSON.parse(subscriber.stream.connection.data).clientData ===
              this.state.pairUser.userNickname
          ) {
            this.setState({ chatConnection: subscriber.stream.connection })
          }
          if (
            this.state.myRoleCode === 2 &&
            JSON.parse(subscriber.stream.connection.data).clientData ===
              this.state.pairUser.userNickname
          ) {
            this.setState({ pairConnection: subscriber.stream.connection })
          }

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          })
          this.setTimer()
        })

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager)
        })

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception)
        })

        //랜덤 주제에서 보낸 시그널을 들어보자
        mySession.on('signal:randomTopic', (event) => {
          this.setState({ randomTopic: event.data })

          console.log(event)
          console.log(event.data)
        })

        // 시간 설정 시그널
        mySession.on('signal:setTime', (event) => {
          this.setState({
            meetingTime: true,
            voteTime: false,
            resultTime: false,
            timeLimit: 10,
          })
        })

        // 투표로 전환
        mySession.on('signal:timeToVote', (event) => {
          this.setState({
            meetingTime: false,
            voteTime: true,
            resultTime: false,
            timeLimit: 21,
          })
        })

        // 결과화면으로 전환
        mySession.on('signal:timeToResult', (event) => {
          this.setState({
            meetingTime: false,
            voteTime: false,
            resultTime: true,
            timeLimit: 0,
          })
        })

        // 투표점수 받기
        mySession.on('signal:sendScore', (event) => {
          // console.log('sendScore', event)
          const name = JSON.parse(event.from.data).clientData
          const score = parseInt(event.data)

          let replace = {
            ...this.state.ranking,
          }
          replace[name] = score

          const sortReplace = Object.entries(replace).sort(([, a], [, b]) => a - b)
          console.log('sortReplace', sortReplace)
          this.setState({
            ranking: sortReplace,
          })
        })

        // 누군가가 틀려서 내가 점수를 받는 경우
        mySession.on('signal:plusPoint', (event) => {
          console.log(
            '쟤가 나한테 점수줌 ㅋ',
            event.data,
            this.state.wrongPoint + 50,
          )
          this.setState({ wrongPoint: this.state.wrongPoint + 50 })
          if (this.state.myRoleCode === 2) {
            this.state.session.signal({
              data: event.data,
              to: [this.state.pairConnection],
              type: 'plusPoint',
            })
          }
        })

        // 시간 추가 시그널
        mySession.on('signal:addTime', (event) => {
          this.setState({ timeLimit: event.data })
        })

        // 세션 나가기
        mySession.on('signal:endMeeting', (event) => {
          const leaveName = event.data
          console.log(leaveName)
          alert(`${leaveName}님이 미팅을 나가 메인화면으로 돌아갑니다.`)
          this.leaveSession()
        })

        //채팅 듣기
        mySession.on('signal:chat', (event) => {
          let chatdata = event.data.split(',')
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: 'messages__item--visitor',
                },
              ],
            })
          }
        })

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname

          // 모두가 알 수 있어야 하는 정보 통신하기(닉네임, 해시태그, 롤코드, 유저넘버)
          mySession
            .connect(token, {
              clientData: this.state.myUserName,
              hashtags: this.state.hashList,
              roleCodes: this.state.myRoleCode,
              userDatas: this.state.myUserData,
            })
            .then(async () => {
              var devices = await this.OV.getDevices()
              var videoDevices = devices.filter(
                (device) => device.kind === 'videoinput',
              )

              // --- 5) Get your own camera stream ---
              let publisher

              if (this.state.myRoleCode === 3) {
                // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                // element: we will manage it on our own) and with the desired properties
                publisher = this.OV.initPublisher(undefined, {
                  audioSource: undefined, // The source of audio. If undefined default microphone
                  videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                  publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: false, // Whether you want to start publishing with your video enabled or not
                  resolution: '640x480', // The resolution of your video
                  frameRate: 30, // The frame rate of your video
                  insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                  mirror: false, // Whether to mirror your local video or not
                })
              } else {
                publisher = this.OV.initPublisher(undefined, {
                  audioSource: undefined, // The source of audio. If undefined default microphone
                  videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                  publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  resolution: '640x480', // The resolution of your video
                  frameRate: 30, // The frame rate of your video
                  insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                  mirror: false, // Whether to mirror your local video or not
                })
              }

              // --- 6) Publish your stream ---

              mySession.publish(publisher)

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              })
            })
            .catch((error) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message,
              )
            })
        })
      },
    )
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session

    if (mySession) {
      mySession.disconnect()
    }

    // Empty all properties...
    this.OV = null
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    })

    this.props.history.push('/main')
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices()
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !== this.state.currentVideoDevice.deviceId,
        )

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager)

          await this.state.session.publish(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    )
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId })
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response)
          resolve(response.data.id)
        })
        .catch((response) => {
          var error = Object.assign({}, response)
          if (error?.response?.status === 409) {
            resolve(sessionId)
          } else {
            console.log(error)
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL,
            )
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              )
            }
          }
        })
    })
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {}
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log('TOKEN', response)
          resolve(response.data.token)
        })
        .catch((error) => reject(error))
    })
  }

  render() {
    // const mySessionId = this.state.mySessionId
    // const myUserName = this.state.myUserName
    const messages = this.state.messages

    return (
      <Background>
        { this.state.resultTime ? <Countdown/> : null }
        <Header>
          <LogoBox>
            <Logo />
          </LogoBox>

          {!this.state.resultTime ? (
            <TimerBox>
              <Timer onClick={this.stopTimer}>
                {this.state.minute}:{this.state.sec < 10 ? 0 : null}
                {this.state.sec}
              </Timer>

              {this.state.meetingTime ? (
                <AddBox onClick={this.showSelectTimer}>
                  <AddTimerImg />
                  <AddText className="timerTip">
                    3분 추가
                    <br />
                    (-100 Lupin)
                  </AddText>
                </AddBox>
              ) : null}

              {this.state.meetingTime && this.state.showAddTimer ? (
                <TimerCheckBox>
                  <TimerCheckBtn className="ok" onClick={this.addTimer}>
                    연장
                  </TimerCheckBtn>
                  <TimerCheckBtn className="no" onClick={this.showSelectTimer}>
                    취소
                  </TimerCheckBtn>
                </TimerCheckBox>
              ) : null}
            </TimerBox>
          ) : null}

          <LeftBox>
            <PointImg />
            <PointText>
              {this.state.myUserPoint === undefined
                ? 0
                : this.state.myUserPoint
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </PointText>
            <Helper />
          </LeftBox>
        </Header>

        <Container>
          {this.state.session !== undefined ? (
            <TopicBox>
              {this.state.meetingTime ? (
                <TopicText>{this.state.randomTopic}</TopicText>
              ) : null}
              {this.state.voteTime ? (
                <TopicText>
                  ❓ 아바타는 누구일까요 ❔<br /> 아바타로 예상되는 유저의
                  화면을 눌러 투표하세요 !
                </TopicText>
              ) : null}
              {this.state.resultTime ? (
                <TopicText>
                  ✨ 투표가 종료되었습니다 ✨<br />
                  서로의 정체를 밝히고 자유롭게 대화하세요 !
                </TopicText>
              ) : null}

              {this.state.meetingTime ? (
                <ChangeBox>
                  <TopicIcon onClick={this.pickTopic}></TopicIcon>
                  {this.state.randomCount > 0 ? (
                    <ChangeText className="changeTip">
                      주제추천
                      <br />
                      (무료 {this.state.randomCount}회)
                    </ChangeText>
                  ) : (
                    <ChangeText className="changeTip">
                      주제추천
                      <br />
                      (-50 Lupin)
                    </ChangeText>
                  )}
                </ChangeBox>
              ) : null}
            </TopicBox>
          ) : null}

          {/* 세션 열렸을 때 */}
          {this.state.session !== undefined ? (
            <SessionBox className="SessionBox">
              <ChatVideoBox>

                {this.state.meetingTime ? (
                  <ChatBox>
                    {this.state.myRoleCode === 1 ? (
                      <MyInfo>
                        <InfoIcon />
                        당신은{' '}
                        <InfoPoint>
                          {' '}
                          {this.state.roleList[this.state.myRoleCode - 1]}
                        </InfoPoint>
                        입니다
                      </MyInfo>
                    ) : (
                      <MyInfo>
                        <InfoIcon />
                        당신은{' '}
                        <InfoPoint>
                          {' '}
                          {this.state.pairUser.userNickname}의{' '}
                          {this.state.roleList[this.state.myRoleCode - 1]}
                        </InfoPoint>
                        입니다
                      </MyInfo>
                    )}
                    {this.state.myRoleCode === 3 ? (
                      <CommanderWarn>
                        * 지시자의 채팅은 아바타만 볼 수 있어요
                      </CommanderWarn>
                    ) : null}
                    <MessageBox>
                      <Messages
                        messages={messages}
                        pairUser={this.state.pairUser}
                        myRole={this.state.myRoleCode}
                        myName={this.state.myUserName}
                      />
                      <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={(el) => {
                          this.messagesEnd = el
                        }}
                      ></div>
                    </MessageBox>
                    <SendMsgBox>
                      <SendMsg
                        id="chat_message"
                        type="text"
                        placeholder="메시지를 입력하세요"
                        onChange={this.handleChatMessageChange}
                        onKeyPress={this.sendmessageByEnter}
                        value={this.state.message}
                      />
                      <SendBtn onClick={this.sendmessageByClick}>전송</SendBtn>
                    </SendMsgBox>
                  </ChatBox>
                ) : null}

                <VideoBox>
                  {/* 내 카메라 */}
                  {this.state.publisher !== undefined ? (
                    <UserVideoComponent
                      streamManager={this.state.publisher}
                      myUserName={this.state.myUserName}
                      myRoleCode={this.state.myRoleCode}
                      myPairUser={this.state.pairUser}
                      meetingTime={this.state.meetingTime}
                      voteTime={this.state.voteTime}
                      resultTime={this.state.resultTime}
                    />
                  ) : null}

                  {/* 상대카메라 */}
                  {this.state.subscribers.map((sub, i) => (
                    <UserVideoComponent
                      streamManager={sub}
                      myUserName={this.state.myUserName}
                      myRoleCode={this.state.myRoleCode}
                      myPairUser={this.state.pairUser}
                      meetingTime={this.state.meetingTime}
                      voteTime={this.state.voteTime}
                      resultTime={this.state.resultTime}
                    />
                  ))}
                </VideoBox>
              </ChatVideoBox>

              <Footer>
                <div />
                {this.state.myRoleCode !== 3 ? (
                  <MicCamBox>
                    {this.state.audiostate ? (
                      <MicOn
                        size="2rem"
                        onClick={() => {
                          this.state.publisher.publishAudio(
                            !this.state.audiostate,
                          )
                          this.setState({ audiostate: !this.state.audiostate })
                        }}
                      />
                    ) : (
                      <MicOff
                        size="2rem"
                        onClick={() => {
                          this.state.publisher.publishAudio(
                            !this.state.audiostate,
                          )
                          this.setState({ audiostate: !this.state.audiostate })
                        }}
                      />
                    )}

                    {this.state.videostate ? (
                      <CamOn
                        size="2rem"
                        onClick={() => {
                          this.state.publisher.publishVideo(
                            !this.state.videostate,
                          )
                          this.setState({ videostate: !this.state.videostate })
                        }}
                      />
                    ) : (
                      <CamOff
                        size="2rem"
                        onClick={() => {
                          this.state.publisher.publishVideo(
                            !this.state.videostate,
                          )
                          this.setState({ videostate: !this.state.videostate })
                        }}
                      />
                    )}
                  </MicCamBox>
                ) : null}

                {!this.state.voteTime ? (
                  <LeaveBox
                    onClick={() => {
                      const mySession = this.state.session

                      mySession.signal({
                        data: `${this.state.myUserName}`,
                        to: [],
                        type: 'endMeeting',
                      })
                      this.leaveSession()
                    }}
                  >
                    <Leave />
                    <LeaveText className="leaveTip">나가기</LeaveText>
                  </LeaveBox>
                ) : (
                  <div />
                )}
              </Footer>
            </SessionBox>
          ) : null}
        </Container>
      </Background>
    )
  }
}

/**
 * --------------------------
 * SERVER-SIDE RESPONSIBILITY
 * --------------------------
 * These methods retrieve the mandatory user token from OpenVidu Server.
 * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
 * the API REST, openvidu-java-client or openvidu-node-client):
 *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
 *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
 *   3) The Connection.token must be consumed in Session.connect() method
 */

//중앙 관리소에서 슬라이스 가져와서 사용할 수 있음
const mapStateToProps = (state) => ({
  // loginSlice
  login: state.login,
  hashtag: state.hashtag,
  mode: state.mode,
  vote: state.vote,
})

// slice에 있는 actions(방찾기, 빠른 시작등등)을 사용하고 싶을 때
const mapDispatchToProps = (dispatch) => {
  return {
    // 빠른시작
    // quickStart는 import { quickStart } from './homeSlice'; 구문을 이용해서 action 가져온 것
    doLoadUser: () => dispatch(loadUser()),
    // doCompareResult: () => dispatch(compareResult()),
  }
}

// export default Meeting(중앙 관리소에서 슬라이스 가져와서 사용하기 위해 connect)
export default connect(mapStateToProps, mapDispatchToProps)(Meeting)
