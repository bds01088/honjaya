import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import styled from 'styled-components'
import { RiAlarmWarningFill } from 'react-icons/ri'

const StreamDiv = styled.div`
  width: 50%;

  &.Commander {
    display: none;
  }
`

const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
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

export default class UserVideoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCommander: false,
    }
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
    return hashtags
  }

  getRolecodes() {
    const roleCodes = JSON.parse(
      this.props.streamManager.stream.connection.data,
    ).roleCodes
    //배열반환
    // console.log("해시태그" , hashtags)
    return roleCodes
  }

  render() {
    return (
      <StreamDiv className={this.getRolecodes() === 3 ? 'Commander' : 'etc'}>
        {this.props.streamManager !== undefined ? (
          <StreamComponent>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <Profile>
              <Nickname>
                {this.getNicknameTag()} <RiAlarmWarning></RiAlarmWarning>
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
