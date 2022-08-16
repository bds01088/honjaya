import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import styled from 'styled-components'
import { TiMessages } from 'react-icons/ti'
import {
  IoPersonCircleOutline
} from 'react-icons/io5'
import UserProfileModal from '../main/profile/UserProfileModal'
import { connect } from 'react-redux'
import { userReport } from './evaluate-slice'
import { storeResult, doingVote, storeConnection } from './vote-slice'
import axios from '../../api/http'
import { requestDirectMessage } from '../main/chat/chat-slice'
import MainHelper from '../main/MainHelper'

const StreamDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 90%;
  &.Commander {
    display: none;
  }
`

const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
  width: 65%;
  justify-content: center;
  flex-direction: column-reverse;
`

const Profile = styled.div`
  text-align: center;
  font-weight: bold;
  margin: 0 auto;
`

const Nickname = styled.div`
  font-size: 2rem;
  font-family: 'Minseo';
  margin: 0;
  display: flex;
  align-items: center;

  &.role2 {
    background-color: #5fcac3;
    border-radius: 1rem;
  }
`

const Hashtag = styled.span`
  font-family: Minseo;
`



const TiMsg = styled(TiMessages)`
  cursor: pointer;
  color: #FF728E;
`

const ProfileIcon = styled(IoPersonCircleOutline)`
  cursor: pointer;
  color: #00C3A9;
`

class UserVideoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCommander: false,
      myUserNo: undefined,
      data: JSON.parse(this.props.streamManager.stream.connection.data),
      voteTo: '',  // 투표 대상
      voteRole: 1, // 1: 솔로, 2: 아바타
      myUserName: this.props.myUserName,
      myRoleCode: this.props.myRoleCode,
      myPairUser: this.props.myPairUser,
      showIcons: false,
      isDuplicated: false,
      isOpen: false,
      oppositeUserNo: 1
    }
    // this.userReport = this.userReoport.bind(this)
  }

 

  componentDidMount() {
    const { mode } = this.props
    const userNo = mode.user.userNo
    const userNickname = this.state.data.clientData
    const oppositeUserNo = this.state.data.userDatas.userNo


    this.setState({
      myUserNo: userNo,
      voteTo: userNickname,
      oppositeUserNo: oppositeUserNo
    })

    // 지시자가 아닌 인물들의 역할코드 저장 ( 결과 비교용 )
    // 1. 내가 아니어야 한다
    // 2. 상대가 솔로인 경우
    // 3. 상대가 아바타이고,
    // 3-1. 내가 지시자일 때, 내 아바타가 아니어야 함
    // 3-2. 내가 지시자가 아니어야 함.
    if (this.state.data.clientData !== this.state.myUserName) {
      if (this.state.data.roleCodes === 1)  {
        this.storeResult()
        this.storeConnection()
      } else if (this.state.data.roleCodes === 2) {
        if (this.state.myRoleCode === 3 && (this.state.data.clientData !== this.state.myPairUser.userNickname)) {
          this.storeResult()
          this.storeConnection()
        } else if (this.state.myRoleCode !== 3) {
          this.storeResult()
          this.storeConnection()
        }
      }
    } else {
      this.setState({showIcons:true})
    }
  }

  //모달 관련
  openUserProfileModal = () => {
    this.setState({isOpen:!this.state.isOpen})
  }



  //DM방개설
  requestDirectMessage() {
    const { doRequestDirectMessage } = this.props
    const oppositeUserNo = JSON.parse(
      this.props.streamManager.stream.connection.data,
    ).userDatas.userNo
    doRequestDirectMessage(oppositeUserNo)
      .unwrap()
      .then((res) => {
        console.log(res.data)
        if (res.data.trueOrFalse) {
          alert("방 개설 성공")
        } else {
          alert("상대가 아직 신청 안함")
        }
      })
      .catch(err => {
        alert('채팅 요청 실패')
        console.log(err)
      })
  }

  // 인물들의 역할코드 결과값 저장 ( 결과 비교용 )
  storeResult() {
    const { doStoreResult } = this.props
    doStoreResult(this.state.data)
  }

  // 인물들의 connection 결과값 저장 ( signal 전송용 )
  storeConnection() {
    const { doStoreConnection } = this.props
    const streamData = this.props.streamManager.stream.connection
    doStoreConnection([this.state.data.clientData, streamData])
  }

  // 나의 투표 저장
  changeVote() {
    if(this.state.voteRole === 1) {
      this.setState({ voteRole: 2 })
    } else if (this.state.voteRole === 2) {
      this.setState({ voteRole: 1 })
    }
  }

  // 나의 투표결과 slice에 저장
  async doingVote() {
    await this.changeVote()
    const { doDoingVote } = this.props
    const data = {
      voteTo: this.state.voteTo,
      voteRole: this.state.voteRole,
    }
    console.log('내 투표', data)
    await doDoingVote(data)
  }

  render() {
    return (
      <>
        {/* 미팅시간 */}
        { this.props.meetingTime ? (
          <StreamDiv className={this.state.data.roleCodes === 3 ? 'Commander' : 'etc'}>
            {this.props.streamManager !== undefined ? (
              <StreamComponent>
                <OpenViduVideoComponent streamManager={this.props.streamManager} />
                <Profile>
                  <Nickname>
                    {/* 화살표함수를 써주거나 바인드를 해준다.. 왜 화살표함수를 써야 에러가 안나지? 화살표 함수안쓰면 렌더링되면서 뜬금없이 신고함 */}
                    {this.state.data.clientData}{' '}
                    

                     
                  </Nickname>
                  {/* Hashtags가 넘어올때 시간차가 생기면서 undefined 일때가 있음 이러한 오류를 방지해주기위해서
                &&를 이용해서 앞에가 참일때만 뒤를 수행하게 함 */}
                  {this.state.data.hashtags &&
                    this.state.data.hashtags.map((item, idx) => (
                      <Hashtag># {item[1]} </Hashtag>
                    ))}
                </Profile>
              </StreamComponent>
            ) : null}
          </StreamDiv>
        ) : null}

        {/* 투표시간 */}
        { this.props.voteTime ? 
          <StreamDiv className={this.state.data.roleCodes === 3 ? 'Commander' : 'etc'}>
          { this.props.streamManager !== undefined ? (
            <StreamComponent onClick={()=> this.doingVote()} >
              <OpenViduVideoComponent streamManager={this.props.streamManager} />
              <Profile>
                <Nickname className={`role${this.state.voteRole}`}>
                  {this.state.data.clientData}
                </Nickname>
              </Profile>
            </StreamComponent>
          ) : null}
          </StreamDiv>
        : null } 

        {/* 결과공개시간 */}
        { this.props.resultTime ? 
          <StreamDiv>
          {this.props.streamManager !== undefined ? (
            <StreamComponent>
              <OpenViduVideoComponent streamManager={this.props.streamManager}/>
              <Profile>
                <Nickname>
                  {this.state.data.clientData}{' '}
                  
                  <ProfileIcon onClick={() => { this.openUserProfileModal()}} /> 
                    {this.state.isOpen ? <UserProfileModal openUserProfileModal={this.openUserProfileModal} oppositeUserNo={this.state.oppositeUserNo} myUserNo={this.state.myUserNo} /> : null}
  
                  { !this.state.showIcons && !this.state.isDuplicated ? <TiMsg onClick={ () => {this.requestDirectMessage()}} />: null}
                  
                   
                </Nickname>
                {/* Hashtags가 넘어올때 시간차가 생기면서 undefined 일때가 있음 이러한 오류를 방지해주기위해서
                &&를 이용해서 앞에가 참일때만 뒤를 수행하게 함 */}
                {this.state.data.hashtags &&
                  this.state.data.hashtags.map((item, idx) => (
                    <Hashtag># {item[1]} </Hashtag>
                  ))}
              </Profile>
            </StreamComponent>
          ) : null}
          </StreamDiv>
        : null }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  mode: state.mode,
  point: state.point,
  vote: state.vote,
  chat: state.chat
})

const mapDispatchToProps = (dispatch) => {
  return {

    doStoreResult: (data) => dispatch(storeResult(data)),
    doStoreConnection: (data) => dispatch(storeConnection(data)),
    doDoingVote: (data) => dispatch(doingVote(data)),
    doRequestDirectMessage: (data) => dispatch(requestDirectMessage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVideoComponent)