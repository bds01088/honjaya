import React, { Component } from 'react'
import OpenViduVideoComponent from './OvVideo'
import './UserVideo.css'
import styled from 'styled-components'

const StreamComponent = styled.div`
  display: flex;
  flex-direction: row;
`

const Nickname = styled.div`
  text-align: center;
  position: absolute;
  width: auto;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
`

export default class UserVideoComponent extends Component {
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
      <div>
        {this.props.streamManager !== undefined ? (
          <StreamComponent className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <Nickname>
              <p>{this.getNicknameTag()}</p>
              {/* Hashtags가 넘어올때 시간차가 생기면서 undefined 일때가 있음 이러한 오류를 방지해주기위해서
              &&를 이용해서 앞에가 참일때만 뒤를 수행하게 함 */}
              {this.getHashtags() &&
                this.getHashtags().map((item, idx) => <h1># {item[1]}</h1>)}
              <h1>{this.getRolecodes()}</h1>
            </Nickname>
          </StreamComponent>
        ) : null}
      </div>
    )
  }
}
