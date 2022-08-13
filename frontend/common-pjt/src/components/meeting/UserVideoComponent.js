import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import styled from 'styled-components'
import { RiAlarmWarningFill } from 'react-icons/ri'
import { connect } from 'react-redux'
import { userReport } from './evaluate-slice'
import axios from '../../api/http'


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
`

const Hashtag = styled.span`
  font-family: Minseo;
`

const RiAlarmWarning = styled(RiAlarmWarningFill)``

class UserVideoComponent extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isCommander: false,
      myUserNo: undefined
    }
    // this.userReport = this.userReoport.bind(this)
  }

  componentDidMount() {
    const { mode } = this.props
    const userNo =  mode.user.userNo
    this.setState({
      myUserNo: userNo
    })
  }


  getNicknameTag() {
    // Gets the nickName of the user

    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData
  }

  getHashtags() {
    const hashtags = JSON.parse(
      this.props.streamManager.stream.connection.data,
    ).hashtags
    //배열반환
    // console.log("해시태그" , hashtags)
    console.log("담기기하나?",this.props.streamManager.stream.connection.data)
    return hashtags
  }

  getRolecodes() {
    const roleCodes = JSON.parse(
      this.props.streamManager.stream.connection.data,
    ).roleCodes
    return roleCodes
  }
  
  userReport() {
    const { doUserReport } = this.props
    console.log("")
    const oppositeUserNo = JSON.parse(
      this.props.streamManager.stream.connection.data,
    ).userDatas.userNo
    console.log("담기기하나?",this.props.streamManager.stream.connection.data)
    console.log("유저넘버",oppositeUserNo)
    const reportData = {
      reportTo : oppositeUserNo,
      reportType : 1,
      reportMessage : "신고체크"
    }
    axios.get(`/honjaya/reports/${this.state.myUserNo}`)
      .then((res) => {
        if (res.data.trueOrFalse) {alert("중복신고금지")
      } else 
      { doUserReport(reportData)
        .unwrap()
        .then((res) => {
          console.log("신고10번누적시응답", res)
        })
        .catch(err => {
          console.log("신고 10번 누적시 에러응답", err)
        })


      }})

    
  }


  render() {
    return (
      <StreamDiv className={this.getRolecodes() === 3 ? 'Commander' : 'etc'}>
        {this.props.streamManager !== undefined ? (
          <StreamComponent>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <Profile>
              <Nickname>
                {/* 화살표함수를 써주거나 바인드를 해준다.. 왜 화살표함수를 써야 에러가 안나지? 화살표 함수안쓰면 렌더링되면서 뜬금없이 신고함 */}
                {this.getNicknameTag()} <RiAlarmWarning onClick={ () => {this.userReport()}}></RiAlarmWarning>

              </Nickname>
              {/* Hashtags가 넘어올때 시간차가 생기면서 undefined 일때가 있음 이러한 오류를 방지해주기위해서
              &&를 이용해서 앞에가 참일때만 뒤를 수행하게 함 */}
              {this.getHashtags() &&
                this.getHashtags().map((item, idx) => (
                  <Hashtag># {item[1]} </Hashtag>
                ))}
            </Profile>
          </StreamComponent>
        ) : null}
      </StreamDiv>
    )
  }
}


const mapStateToProps = (state) => ({
  mode: state.mode,
  point: state.point
})

const mapDispatchToProps = (dispatch) => {
  return {
    doUserReport: (data) => dispatch(userReport(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVideoComponent)
