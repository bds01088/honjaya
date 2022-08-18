import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import styled from 'styled-components'
import { TiMessages } from 'react-icons/ti'
import { IoPersonCircleOutline } from 'react-icons/io5'
import UserProfileModal from './UserProfileModal'
import { connect } from 'react-redux'
import { storeResult, doingVote, storeConnection } from './vote-slice'
import axios from '../../api/http'
import { requestDirectMessage } from '../main/chat/chat-slice'
import { opponentUserProfile } from '../main/profile/profile-slice'
import { ToastsStore } from 'react-toasts'
import {
  getRateRecord,
  putRate,
  setRate,
  getOtherRate,
} from '../main/hashtag/rate-slice'
import Rating from '@mui/material/Rating'

const StreamComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 96%;
  justify-content: center;
  align-items: center;

  &.Commander {
    display: none;
  }
`

const Profile = styled.div`
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Nickname = styled.p`
  font-size: 2rem;
  font-family: 'Minseo';
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;

  &.role2 {
    background-color: #4da39d;
    border-radius: 1rem;
  }
`
const HashList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

const RatingBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: Minseo;
  font-size: 1.2rem;
`

const RatingBtn = styled.button`
  margin-left: 0.5rem;
  background-color: #f6a9a9;
  border: 2px solid #333333;
  color: #333333;
  border-radius: 1rem;
  font-family: Minseo;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #d18181;
  }
`

const RatingCancelBtn = styled.button`
  margin-left: 0.2rem;
  background-color: #4da39d;
  border: 2px solid #333333;
  color: #333333;
  border-radius: 1rem;
  font-family: Minseo;
  font-size: 1.2rem;

  &:hover {
    background-color: #3b837e;
  }
`

const Hashtag = styled.span`
  font-family: Minseo;
  font-size: 1.2rem;
`

const TiMsg = styled(TiMessages)`
  cursor: pointer;
  color: #ff728e;
`

const ProfileIcon = styled(IoPersonCircleOutline)`
  cursor: pointer;
  color: #00c3a9;
`

class UserVideoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCommander: false,
      myUserNo: undefined,
      data: JSON.parse(this.props.streamManager.stream.connection.data),
      voteTo: '', // 투표 대상
      voteRole: 1, // 1: 솔로, 2: 아바타
      myUserName: this.props.myUserName,
      myRoleCode: this.props.myRoleCode,
      myPairUser: this.props.myPairUser,

      showIcons: false,
      isDuplicated: false,
      isOpen: false,
      oppositeUserNo: 1,
      userPicUrl: undefined,

      avgRate: undefined,
      rate: undefined,
      rateRecord: false,
      rateModal: false,
      rateNo: undefined,
    }
  }

  async componentDidMount() {
    const { mode, getOtherRate, getOpponentUserProfile } = this.props
    const userNo = mode.user.userNo
    const userNickname = this.state.data.clientData
    const oppositeUserNo = this.state.data.userDatas.userNo

    this.setState({
      myUserNo: userNo,
      voteTo: userNickname,
      oppositeUserNo: oppositeUserNo,
    })

    const picUrlRes = await getOpponentUserProfile(oppositeUserNo)
    console.log('비디오컴포넌트에서 url출력', picUrlRes)
    this.setState({ userPicUrl: picUrlRes.payload.data.userProfilePicUrl })

    const avgRes = await getOtherRate(this.state.data.userDatas.userNo)
    console.log('평균점수 응답', avgRes)
    this.setState({ avgRate: avgRes.payload.rateScore })

    // 지시자가 아닌 인물들의 역할코드 저장 ( 결과 비교용 )
    // 1. 내가 아니어야 한다
    // 2. 상대가 솔로인 경우
    // 3. 상대가 아바타이고,
    // 3-1. 내가 지시자일 때, 내 아바타가 아니어야 함
    // 3-2. 내가 지시자가 아니어야 함.
    if (this.state.data.clientData !== this.state.myUserName) {
      if (this.state.data.roleCodes === 1) {
        this.storeResult()
        this.storeConnection()
      } else if (this.state.data.roleCodes === 2) {
        if (
          this.state.myRoleCode === 3 &&
          this.state.data.clientData !== this.state.myPairUser.userNickname
        ) {
          this.storeResult()
          this.storeConnection()
        } else if (this.state.myRoleCode !== 3) {
          this.storeResult()
          this.storeConnection()
        }
      }
    } else {
      this.setState({ showIcons: true })
    }
  }

  //모달 관련
  openUserProfileModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  // DM방개설
  requestDirectMessage() {
    const { doRequestDirectMessage } = this.props
    axios.get(`/honjaya/chats/ask/${this.state.oppositeUserNo}`).then((res) => {
      if (res.data.trueOrFalse) {
        ToastsStore.info('중복 신청은 할 수 없어요❗')
        this.setState({ isDuplicated: true })
      } else {
        doRequestDirectMessage(this.state.oppositeUserNo)
          .unwrap()
          .then((res) => {
            if (res.data.trueOrFalse) {
              ToastsStore.info('🎊 1:1 채팅방이 개설되었습니다! 📩')
              this.setState({ isDuplicated: true })
            } else {
              ToastsStore.info('🎉 1:1 채팅 신청이 완료되었습니다! 📨')
              this.setState({ isDuplicated: true })
            }
          })
          .catch((err) => {
            ToastsStore.info('채팅요청에 실패했습니다 😥')
            console.log(err)
          })
      }
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
    if (this.state.voteRole === 1) {
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
    await doDoingVote(data)
  }

  //점수 평가하기
  async onhandleRate() {
    if (this.state.rateModal === false) {
      const { getRateRecord } = this.props
      const record = await getRateRecord(this.state.data.userDatas.userNo)
      if (record.payload.data.rateScore !== 0) {
        this.setState({ rateRecord: true })
      }
      this.setState({ rateNo: record.payload.data.rateNo })
      this.setState({ rate: record.payload.data.rateScore })
      this.setState({ rateModal: true })
    } else {
      this.setState({ rateModal: false })
    }
  }

  async sendRate() {
    const { setRate, putRate, getOtherRate } = this.props
    if (this.state.rateRecord === false) {
      const rateData = {
        rateTo: this.state.data.userDatas.userNo,
        rateScore: this.state.rate,
      }
      await setRate(rateData)
      await getOtherRate(this.state.data.userDatas.userNo).then((res) => {
        const new_avgRate = res.payload.rateScore
        this.setState({ avgRate: new_avgRate })
      })
    } else {
      const rateData = {
        rateNo: this.state.rateNo,
        rateScore: this.state.rate,
      }
      await putRate(rateData)
      await getOtherRate(this.state.data.userDatas.userNo).then((res) => {
        const new_avgRate = res.payload.rateScore
        this.setState({ avgRate: new_avgRate })
      })
    }
    this.setState({ rateModal: false })
  }

  render() {
    return (
      <>
        {/* 미팅시간 */}
        {this.props.meetingTime && this.props.streamManager !== undefined ? (
          <StreamComponent className={this.state.data.roleCodes === 3 ? 'Commander' : 'etc'}>
            <Profile>
              <Nickname>
                {this.state.data.clientData}{' '}
              </Nickname>
              <HashList>
                {/* Hashtags가 넘어올때 시간차가 생기면서 undefined 일때가 있음 이러한 오류를 방지해주기위해서
                  &&를 이용해서 앞에가 참일때만 뒤를 수행하게 함 */}
                {this.state.data.hashtags &&
                  this.state.data.hashtags.map((item, idx) => (
                    <Hashtag># {item[1]} </Hashtag>
                  ))}
              </HashList>
            </Profile>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </StreamComponent>
        ) : null}

        {/* 투표시간 */}
        {this.props.voteTime && this.props.streamManager !== undefined ? (
          <StreamComponent
            className={this.state.data.roleCodes === 3 ? 'Commander' : 'etc'}
            onClick={() => this.doingVote()}
          >
            <Profile>
              <Nickname className={`role${this.state.voteRole}`}>
                {this.state.data.clientData}
              </Nickname>
            </Profile>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </StreamComponent>
        ) : null}

        {/* 결과공개시간 */}
        {this.props.resultTime && this.props.streamManager !== undefined ? (
          <StreamComponent className="StreamComponent">
            <Profile>
              <Nickname>
                {this.state.data.clientData}{' '}
                <ProfileIcon onClick={() => { this.openUserProfileModal() }} />
                {this.state.isOpen ? (
                  <UserProfileModal
                    openUserProfileModal={this.openUserProfileModal}
                    oppositeUserNo={this.state.oppositeUserNo}
                    myUserNo={this.state.myUserNo}
                    userProfilePicUrl={this.state.userPicUrl}
                  />
                ) : null}
                {!this.state.showIcons && !this.state.isDuplicated ? (
                  <TiMsg onClick={() => {this.requestDirectMessage()}}/>
                ) : null}
              </Nickname>

              <RatingBox>
                {this.state.rateModal ? (
                  <>
                    <Rating
                      name="simple-controlled"
                      precision={0.5}
                      value={this.state.rate}
                      onChange={(event, newValue) => { this.setState({ rate: newValue })}}
                    />
                    {this.state.rate}
                    <RatingBtn onClick={() => this.sendRate()}>저장</RatingBtn>
                    <RatingCancelBtn onClick={() => this.setState({ rateModal: false })}>
                      취소
                    </RatingCancelBtn>
                  </>
                ) : (
                  <>
                    {this.state.avgRate ? (
                      <>
                        <Rating
                          name="avgRate"
                          precision={0.5}
                          value={this.state.avgRate}
                          readOnly
                        />
                        {this.state.avgRate}
                      </>
                    ) : (
                      <>
                        <Rating
                          name="avgRate"
                          precision={0.5}
                          value={0}
                          readOnly
                        />
                        {'0'}
                      </>
                    )}

                    <RatingBtn onClick={() => this.onhandleRate()}>
                      별점주기
                    </RatingBtn>
                  </>
                )}
              </RatingBox>
            </Profile>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
          </StreamComponent>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  mode: state.mode,
  point: state.point,
  vote: state.vote,
  chat: state.chat,
  profile: state.profile,
})

const mapDispatchToProps = (dispatch) => {
  return {
    doStoreResult: (data) => dispatch(storeResult(data)),
    doStoreConnection: (data) => dispatch(storeConnection(data)),
    doDoingVote: (data) => dispatch(doingVote(data)),
    doRequestDirectMessage: (data) => dispatch(requestDirectMessage(data)),
    getRateRecord: (data) => dispatch(getRateRecord(data)),
    putRate: (data) => dispatch(putRate(data)),
    setRate: (data) => dispatch(setRate(data)),
    getOtherRate: (data) => dispatch(getOtherRate(data)),
    getOpponentUserProfile: (data) => dispatch(opponentUserProfile(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVideoComponent)
