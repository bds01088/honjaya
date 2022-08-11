import axios from 'axios'
import { OpenVidu } from 'openvidu-browser'
import React, { Component } from 'react'
import './meeting.css'
import UserVideoComponent from './UserVideoComponent'
import { connect } from 'react-redux'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import addTimerImg from '../../assets/add-timer.png'
import pointImg from '../../assets/carrot.png'
import { MdHelpOutline } from 'react-icons/md'

import Messages from './meeting-chat/Messages'

import myAxios from '../../api/http'
import { loadUser } from '../auth/login/login-slice'
// import randomTopic from '../../DATA/randomTopic.json'


const OPENVIDU_SERVER_URL = 'https://i7e104.p.ssafy.io:4443';
// const OPENVIDU_SERVER_URL = 'https://coach82.p.ssafy.io:4443'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'

// 전체 배경
const Background = styled.div`
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
  top: 110%;
  left: 18%;
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
  outline: 3px solid;
  width: 100%;
  height: 90%;
`

const VideoBox = styled.div`
  outline: 3px solid green;
  display: grid;
  grid-template-columns: repeat(2);
  grid-template-rows: 50% 50%;
  grid-gap: 1rem;
  width: 50%;
  height: 50%;
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
      timeLimit: 60 * 10,
      minute: 10,
      sec: 0,
      myUserPoint: 0,
      showAddTimer: false,

      //채팅관련
      message: '',
      messages: [],

      //해쉬태그
      hashList : [],

      //랜덤주제
      randomTopic: "리액트 vs 뷰",
      topicList: ["좋아하는 웹툰","좋아하는 영화","좋아하는 음식","최근에 간 여행지","mbti"],
       

      //이건 flag 역할인가
      check: false,
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

    //채팅
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);

    // 해쉬태그 로드
    this.sendHash = this.sendHash.bind(this);
  }

  componentDidMount() {


    

    const { mode } = this.props
    const { login } = this.props
    const { hashtag } = this.props
    const { userNickname, userPoint } = login.user
    const { hashesOwned } = hashtag
    const { uuid } = mode
    
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
        // 스톱워치 종료
        this.stopTimer()
      }
    }, 1000)

    
    this.setState({
      myUserName: userNickname,
      myUserPoint: userPoint,
      hashList: hashesOwned
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
        type: 'addTime'
      })
      
      const res = await myAxios.put('/honjaya/points', {
        point: 100,
      })
      console.log("포인트수정", res)
      
      await this.setState({
        myUserPoint: res.data.point
      })
    } catch(err) {
      console.log("error")
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
    for (var i = 0; i<5; i++){
      arr[i] = i;
    }
    arr.sort(() => Math.random() - 0.5)
    // randomTopic 바꿔주기
    this.setState({ randomTopic: this.state.topicList[arr[0]]})
    
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
        
      const res = await myAxios.put('/honjaya/points',{
        point: 300,
      })
      console.log("포인트수정",res)

      await this.setState({
        myUserPoint: res.data.point
      })
    } catch (err) {
      console.log('error')
    }
  }
    //sendHash
    async sendHash() {
      this.state.session.signal({
        data: `${this.state.myUserName}`,
        to: [],
        type: 'hashtags',
      })
      .then(()=>{console.log("해쉬시그널보내기완료")})
      .catch(() => {})
  }



  //채팅 보내는 함수
  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
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
    });
    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: 'chat',
    });

    this.setState({
      message: '',
    });
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
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: 'chat',
      });

      this.setState({
        message: '',
      });
      console.log("aaaaa", this.state.publisher)
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

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          })
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

        // 시간 추가 시그널
        mySession.on('signal:addTime', (event) => {
          this.setState({ timeLimit: event.data })
          
          console.log('event', event)
        })

        //채팅 듣기
        mySession.on('signal:chat', (event) => {
          let chatdata = event.data.split(',');
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
            });
          }
        });
        //해쉬태그듣기
        mySession.on('signal:hashtags', (event) => {
          this.setState({ hashtags: event.data })

          console.log("해쉬태그보내기", event.data)
          console.log(event.data)
        })

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          
          // 해쉬태그 넣어주기
          mySession
            .connect(token, { clientData: this.state.myUserName, hashtags: this.state.hashList })
            .then(async () => {
              var devices = await this.OV.getDevices()
              var videoDevices = devices.filter(
                (device) => device.kind === 'videoinput',
              )

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              })

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
    const mySessionId = this.state.mySessionId
    const myUserName = this.state.myUserName
    const messages = this.state.messages;

    return (
      <Background>
        <Header>
          <LogoBox>
            <Logo />
          </LogoBox>

          <TimerBox>
            <Timer onClick={this.stopTimer}>
              {this.state.minute}:{this.state.sec < 10 ? 0 : null}
              {this.state.sec}
            </Timer>
            <AddBox onClick={this.showSelectTimer}>
              <AddTimerImg />
              <AddText className="timerTip">
                3분 추가
                <br />
                (-100 Lupin)
              </AddText>
            </AddBox>
            {this.state.showAddTimer ? (
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
          <LeftBox>
            <PointImg />
            <PointText>{this.state.myUserPoint}</PointText>
            <Helper />
          </LeftBox>
        </Header>

        <Container>
          {/* 세션 입장 대기 화면 */}
          {this.state.session === undefined ? (
            <div id="join">
              <div id="join-dialog" className="jumbotron vertical-center">
                <h1> Join a video session </h1>
                <form className="form-group" onSubmit={this.joinSession}>
                  <p>
                    <label>Participant: </label>
                    <input
                      className="form-control"
                      type="text"
                      id="userName"
                      value={myUserName}
                      onChange={this.handleChangeUserName}
                      required
                    />
                  </p>
                  <p>
                    <label> Session: </label>
                    <input
                      className="form-control"
                      type="text"
                      id="sessionId"
                      value={mySessionId}
                      onChange={this.handleChangeSessionId}
                      required
                    />
                  </p>
                  <p className="text-center">
                    <input
                      className="btn btn-lg btn-success"
                      name="commit"
                      type="submit"
                      value="JOIN"
                    />
                  </p>
                </form>
              </div>
            </div>
          ) : null}

          {/* 세션 열렸을 때 */}
          {this.state.session !== undefined ? (
            <div id="session">
              <Header>
                <input
                  className="btn btn-large btn-danger"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={this.leaveSession}
                  value="나가기"
                />
                {this.state.randomTopic}

            

          
              
    
                <button onClick={this.pickTopic}>주제변경</button>
              </Header>

              {/* mainStreamMnager가 있다면 */}
              {this.state.mainStreamManager !== undefined ? (
                <div id="main-video" className="col-md-6">
                  {/* <UserVideoComponent
                    streamManager={this.state.mainStreamManager}
                  /> */}
                  <input
                    className="btn btn-large btn-success"
                    type="button"
                    id="buttonSwitchCamera"
                    onClick={this.switchCamera}
                    value="Switch Camera"
                  />
                </div>
              ) : null}

              <VideoBox id="video-container">
                {this.state.publisher !== undefined ? (
                  <div
                    className="stream-container col-md-6 col-xs-6"
                    onClick={() =>
                      this.handleMainVideoStream(this.state.publisher)
                    }
                  >
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </div>
                ) : null}
                {this.state.subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className="stream-container col-md-6 col-xs-6"
                    onClick={() => this.handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </VideoBox>
              {/* 채팅창 */}
              <div className="chatbox">
                <div className="chat chatbox__support chatbox--active">
                  <div className="chat chatbox__header" />
                  <div className="chatbox__messages" ref="chatoutput">
                    {/* {this.displayElements} */}
                    <Messages messages={messages} />
                    <div />
                  </div>
                  <div className="chat chatbox__footer">
                    <input
                      id="chat_message"
                      type="text"
                      placeholder="Write a message..."
                      onChange={this.handleChatMessageChange}
                      onKeyPress={this.sendmessageByEnter}
                      value={this.state.message}
                    />
                    <p
                      className="chat chatbox__send--footer"
                      onClick={this.sendmessageByClick}
                    >
                      Send
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
  mode: state.mode
})
// slice에 있는 actions(방찾기, 빠른 시작등등)을 사용하고 싶을 때
const mapDispatchToProps = (dispatch) => {
  return {
    // 빠른시작
    // quickStart는 import { quickStart } from './homeSlice'; 구문을 이용해서 action 가져온 것
    doLoadUser: () => dispatch(loadUser()),
  }
}


// export default Meeting(중앙 관리소에서 슬라이스 가져와서 사용하기 위해 connect)
export default connect(mapStateToProps, mapDispatchToProps)(Meeting)
